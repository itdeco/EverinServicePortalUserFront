import { NextResponse } from "next/server";
import { Category, PriceRule } from "@/types/subscribe";

const SERVICE_LIST_PATH = "/VEN.Ylw.ZBM.BssIFPortalService/ServiceList";
const PRICE_LIST_PATH = "/VEN.Ylw.ZBM.BssIFPortalService/PriceList";

const toNumber = (value: unknown, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
};

const toBool = (value: unknown) => value === "1" || value === 1 || value === true;

function createBmsBody(portalId: string) {
    return {
        ROOT: {
            certId: process.env.BMS_CERT_ID,
            certKey: process.env.BMS_CERT_KEY,
            dsnBis: process.env.BMS_DSN_BIS,
            dsnOper: process.env.BMS_DSN_OPER,
            companySeq: Number(process.env.BMS_COMPANY_SEQ || 1),
            data: {
                ROOT: {
                    DataBlock1: {
                        PortalID: portalId,
                    },
                },
            },
        },
    };
}

async function callBms(path: string, body: unknown) {
    const response = await fetch(`${process.env.BMS_SERVER}${path}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(`${path} 호출 실패: ${response.status} / ${text}`);
    }

    if (!text) {
        throw new Error(`${path} 응답이 비어있습니다.`);
    }

    return JSON.parse(text);
}

function convertPriceRules(priceList: any): PriceRule[] {
    return (priceList?.DataBlock1 ?? []).map((row: any) => ({
        modelSeq: toNumber(row.ModelSeq),
        serviceItemSeq: toNumber(row.ServiceItemSeq),
        serviceItemName: row.ServiceItemName ?? "",
        subServiceItemSeq: toNumber(row.SubServiceItemSeq),
        subServiceItemName: row.SubServiceItemName ?? "",
        smPriceType: toNumber(row.SMPriceType),
        smPriceTypeName: row.SMPriceTypeName ?? "",
        appYm: row.AppYm ?? "",
        seq: toNumber(row.Seq),
        perFr: toNumber(row.PerFr),
        perTo: toNumber(row.PerTo),
        currPrice: toNumber(row.CurrPrice),
        basicPrice: toNumber(row.BasicPrice),
        currSeq: toNumber(row.CurrSeq),
        currName: row.CurrName ?? "",
    }));
}

function getMatchedPriceRules(
    rules: PriceRule[],
    serviceItemSeq: number,
    subServiceItemSeq: number = -1
) {
    return rules.filter(
        (rule) =>
            rule.serviceItemSeq === serviceItemSeq &&
            rule.subServiceItemSeq === subServiceItemSeq
    );
}

function getDefaultPrice(rules: PriceRule[], fallbackPrice: number) {
    if (rules.length === 0) return fallbackPrice;

    const fixed = rules.find((rule) => rule.smPriceType === 2039001);
    const range = rules.find((rule) => rule.smPriceType === 2039002);

    return toNumber((fixed ?? range ?? rules[0]).currPrice, fallbackPrice);
}

function buildServiceConfig(serviceList: any, priceList: any): Category[] {
    const services = serviceList?.DataBlock1 ?? [];
    const plans = serviceList?.DataBlock2 ?? [];
    const subServices = serviceList?.DataBlock3 ?? [];
    const priceRules = convertPriceRules(priceList);

    const categoryMap = new Map<string, Category>();

    const buildPriceMeta = (serviceItemSeq: number, fallbackPrice: number) => {
        const rules = getMatchedPriceRules(priceRules, serviceItemSeq, -1);

        return {
            price: getDefaultPrice(rules, fallbackPrice),
            priceRules: rules,
            smPriceType: rules[0]?.smPriceType,
            smPriceTypeName: rules[0]?.smPriceTypeName,
            appYm: rules[0]?.appYm,
            priceSeq: rules[0]?.seq,
            currSeq: rules[0]?.currSeq,
            currName: rules[0]?.currName,
        };
    };

    services.forEach((row: any) => {
        const categoryId = String(row.CategorySeq);
        const serviceSeq = toNumber(row.ServiceSeq);
        const serviceItemSeq = toNumber(row.ServiceItemSeq);

        if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, {
                categoryId,
                categoryName: row.CategoryName ?? "",
                sortOrder: toNumber(row.CategorySeq),
                services: [],
            });
        }

        const servicePlans = plans
            .filter((plan: any) => toNumber(plan.ServiceSeq) === serviceSeq)
            .sort((a: any, b: any) => toNumber(a.PlanSeq) - toNumber(b.PlanSeq))
            .map((plan: any) => {
                const planSeq = toNumber(plan.PlanSeq);
                const planServiceItemSeq = toNumber(plan.ServiceItemSeq);
                const priceMeta = buildPriceMeta(planServiceItemSeq, toNumber(plan.Price));
                const children = subServices
                    .filter(
                        (sub: any) =>
                            toNumber(sub.UpperServiceSeq) === serviceSeq &&
                            toNumber(sub.PlanSeq) === planSeq
                    )
                    .sort((a: any, b: any) => toNumber(a.SortOrder) - toNumber(b.SortOrder));

                return {
                    planId: String(planSeq),
                    planName: plan.PlanName ?? "",
                    description: plan.Description ?? "",
                    defaultUsercount: toNumber(plan.DefaultUserCount, 10),
                    // IsGroupService=1인 플랜은 부모 플랜 자체가 과금 대상이 아니라
                    // 하위 서비스 조합으로 계산해야 하므로 quoteOnly로 막지 않는다.
                    quoteOnly: toBool(plan.QuoteOnly) && !toBool(plan.IsGroupService) && children.length === 0,
                    sortOrder: planSeq,
                    isGroupService: toBool(plan.IsGroupService),
                    serviceItemSeq: planServiceItemSeq,
                    policySeq: toNumber(plan.PolicySeq),
                    allowedChildren: children.map(
                        (sub: any) => `${serviceSeq}-${planSeq}-${toNumber(sub.ServiceItemSeq)}-${toNumber(sub.SubServiceItemSeq, -1)}`
                    ),
                    ...priceMeta,
                    currSeq: toNumber(plan.CurrSeq, priceMeta.currSeq),
                    currName: plan.CurrName ?? priceMeta.currName,
                };
            });

        const servicePriceMeta = buildPriceMeta(serviceItemSeq, toNumber(row.Price));

        const mappedService = {
            serviceId: String(serviceSeq),
            serviceName: row.ServiceName ?? "",
            description: row.Description ?? "",
            defaultUsercount: toNumber(row.DefaultUserCount, 10),
            quoteOnly: toBool(row.QuoteOnly),
            sortOrder: toNumber(row.SortOrder),
            isGroupService: toBool(row.IsGroupService),
            isExistPlan: toBool(row.IsExistPlan),
            serviceItemSeq,
            policySeq: toNumber(row.PolicySeq),
            plans: servicePlans,
            subServices: subServices
                .filter((sub: any) => toNumber(sub.UpperServiceSeq) === serviceSeq)
                .sort((a: any, b: any) => toNumber(a.SortOrder) - toNumber(b.SortOrder))
                .map((sub: any) => {
                    const planSeq = toNumber(sub.PlanSeq);
                    const subServiceItemSeq = toNumber(sub.ServiceItemSeq);
                    const subSubServiceItemSeq = toNumber(sub.SubServiceItemSeq, -1);
                    const subId = `${serviceSeq}-${planSeq}-${subServiceItemSeq}-${subSubServiceItemSeq}`;
                    const priceMeta = buildPriceMeta(subServiceItemSeq, toNumber(sub.Price));

                    return {
                        serviceId: subId,
                        serviceName: sub.ServiceName ?? "",
                        description: sub.Description ?? "",
                        defaultUsercount: toNumber(sub.DefaultUserCount, 10),
                        quoteOnly: toBool(sub.QuoteOnly),
                        sortOrder: toNumber(sub.SortOrder),
                        upperServiceSeq: serviceSeq,
                        planSeq,
                        isSubService: toBool(sub.IsSubService),
                        serviceItemSeq: subServiceItemSeq,
                        subServiceItemSeq: subSubServiceItemSeq,
                        policySeq: toNumber(sub.PolicySeq),
                        ...priceMeta,
                        currSeq: toNumber(sub.CurrSeq, priceMeta.currSeq),
                        currName: sub.CurrName ?? priceMeta.currName,
                    };
                }),
            ...servicePriceMeta,
            currSeq: toNumber(row.CurrSeq, servicePriceMeta.currSeq),
            currName: row.CurrName ?? servicePriceMeta.currName,
        };

        categoryMap.get(categoryId)?.services.push(mappedService);
    });

    return [...categoryMap.values()].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}
export async function POST(req: Request) {
    try {
        const { portalId = "EVERIN" } = await req.json();
        const body = createBmsBody(portalId);

        const [serviceList, priceList] = await Promise.all([
            callBms(SERVICE_LIST_PATH, body),
            callBms(PRICE_LIST_PATH, body),
        ]);

        const serviceConfig = buildServiceConfig(serviceList, priceList);

        return NextResponse.json({
            serviceConfig,
            raw: {
                serviceList,
                priceList,
            },
        });
    } catch (error) {
        console.error("BMS Subscribe API 오류", error);

        return NextResponse.json(
            { message: "구독 서비스/가격 API 처리 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
