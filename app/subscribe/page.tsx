"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Calculator,
  ArrowRight,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ApiSubscribe from "@/api/Subscribe";
import { useLoginStatus } from "@/redux/selectors/Users";
import {
  readSubscribeSelectionSnapshot,
  SubscribeSelectionItem,
  SubscribeSelectionSnapshot,
  writeSubscribeSelectionSnapshot,
} from "@/utils/subscribeSelection";
import {
  Category,
  Service,
  Plan as PlanItem,
} from "@/types/subscribe";

type SelectedState = Record<string, boolean>;
type PlanState = Record<string, string>;
type HeadcountState = Record<string, number>;
type OpenState = Record<string, boolean>;
type SelectedSummaryItem = Partial<SubscribeSelectionItem> & {
  name: string;
  price?: number;
  quoteOnly?: boolean;
  groupOnly?: boolean;
};
type DetailTarget = {
  item: any;
  currentItem: any;
  headcount: number;
  plans?: PlanItem[];
  selectedPlanId?: string;
};

type PromotionBubbleTone = "evertime" | "free";
type SummaryCardProps = {
  displayTotal: number;
  displayCurrencyName?: string;
  selectedItems: SelectedSummaryItem[];
  hasQuoteOnly: boolean;
  onSubscribe: () => void;
  onEstimate: () => void;
  className?: string;
  scrollClassName?: string;
};

const fallbackServiceConfig: Category[] = [];

const getCurrencyLabel = (currName?: string) => {
  if (!currName || currName.toUpperCase() === "KRW") return "\uC6D0";

  return currName;
};

const getItemCurrencyName = (item?: any, headcount = 0) =>
    getMatchedRule(item, headcount)?.currName ?? item?.currName;

const currency = (n: number, currName?: string) =>
    `${Math.round(n).toLocaleString("ko-KR")}${getCurrencyLabel(currName)}`;

const perPerson = (n: number, currName?: string) =>
    `${currency(n, currName)}/\uC778`;

const getMatchedRule = (item: any, headcount: number) => {
  const rules = item.priceRules ?? [];

  return rules.find((rule: any) => {
    if (rule.smPriceType !== 2039002) return false;
    return headcount > rule.perFr && headcount <= rule.perTo;
  }) ?? rules.find((rule: any) => rule.smPriceType === 2039001) ?? rules[0];
};

const getItemTotal = (item: any, headcount: number) => {
  const rule = getMatchedRule(item, headcount);

  if (!rule) return (item.price ?? 0) * headcount;

  // 인원범주
  if (rule.smPriceType === 2039002) {
    return (
        Number(rule.basicPrice ?? 0) +
        (headcount - Number(rule.perFr ?? 0)) * Number(rule.currPrice ?? 0)
    );
  }

  // 고정단가
  return Number(rule.currPrice ?? item.price ?? 0) * headcount;
};

const getItemUnitPrice = (item: any, headcount: number) => {
  if (headcount <= 0) return 0;

  const rule = getMatchedRule(item, headcount);

  if (!rule) return Number(item.price ?? 0);

  if (rule.smPriceType === 2039002) {
    return Math.round(getItemTotal(item, headcount) / headcount);
  }

  return Number(rule.currPrice ?? item.price ?? 0);
};

const getServiceUnitPrice = (
    service: Service,
    plan?: PlanItem,
    headcount: number = 0
) => {
  if (service.quoteOnly || plan?.quoteOnly) return 0;

  if (plan) {
    return getItemUnitPrice(plan, headcount);
  }

  return getItemUnitPrice(service, headcount);
};

const sortServiceConfig = (data: Category[]): Category[] => {
  return [...data]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((category) => ({
        ...category,
        services: [...(category.services ?? [])]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((service) => ({
              ...service,
              plans: [...(service.plans ?? [])].sort(
                  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
              ),
              subServices: [...(service.subServices ?? [])].sort(
                  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
              ),
            })),
      }));
};

function buildInitialSelected(config: Category[]): SelectedState {
  const acc: SelectedState = {};

  config.forEach((cat) => {
    cat.services.forEach((svc) => {
      acc[svc.serviceId] = false;

      svc.subServices?.forEach((sub) => {
        acc[sub.serviceId] = false;
      });
    });
  });

  return acc;
}

function buildInitialPlans(config: Category[]): PlanState {
  const acc: PlanState = {};

  config.forEach((cat) => {
    cat.services.forEach((svc) => {
      if (svc.plans?.length) {
        acc[svc.serviceId] = svc.plans[0].planId;
      }
    });
  });

  return acc;
}

function buildInitialHeadcount(config: Category[]): HeadcountState {
  const acc: HeadcountState = {};

  config.forEach((cat) => {
    cat.services.forEach((svc) => {
      const firstPlanDefaultUsercount = svc.plans?.[0]?.defaultUsercount;
      acc[svc.serviceId] = svc.defaultUsercount || firstPlanDefaultUsercount || 10;

      svc.subServices?.forEach((sub) => {
        acc[sub.serviceId] = sub.defaultUsercount || svc.defaultUsercount || firstPlanDefaultUsercount || 10;
      });
    });
  });

  return acc;
}

function buildInitialOpen(config: Category[]): OpenState {
  const acc: OpenState = {};

  config.forEach((cat) => {
    acc[cat.categoryId] = true;

    cat.services.forEach((svc) => {
      acc[svc.serviceId] = true;
    });
  });

  return acc;
}

function mergeKnownKeys<T extends Record<string, any>>(
    base: T,
    saved?: Record<string, any> | null
): T {
  if (!saved) return base;

  const next = { ...base };

  Object.keys(base).forEach((key) => {
    if (saved[key] !== undefined) {
      next[key as keyof T] = saved[key];
    }
  });

  return next;
}

function getModelSeq(item: any, headcount: number) {
  return getMatchedRule(item, headcount)?.modelSeq ?? item.priceRules?.[0]?.modelSeq;
}

function buildSubscribeSelectionItem({
                                       item,
                                       parent,
                                       plan,
                                       headcount,
                                       name,
                                       quoteOnly,
                                       groupOnly,
                                     }: {
  item: any;
  parent?: Service;
  plan?: PlanItem;
  headcount: number;
  name: string;
  quoteOnly?: boolean;
  groupOnly?: boolean;
}): SelectedSummaryItem {
  const amount = quoteOnly || groupOnly ? 0 : getItemTotal(item, headcount);
  const unitPrice = quoteOnly || groupOnly ? 0 : getItemUnitPrice(item, headcount);

  return {
    name,
    serviceId: parent?.serviceId ?? item.serviceId,
    serviceName: parent?.serviceName ?? item.serviceName,
    planId: plan?.planId,
    planName: plan?.planName,
    productName: item.serviceName ?? item.planName,
    unitPrice,
    amount,
    price: amount,
    quoteOnly,
    groupOnly,
    isGroupService: groupOnly,
    isSubService: !!item.isSubService,
    upperServiceId: parent?.serviceId,
    upperServiceSeq: item.upperServiceSeq,
    serviceItemSeq: item.serviceItemSeq,
    subServiceItemSeq: item.subServiceItemSeq ?? -1,
    policySeq: item.policySeq,
    currSeq: item.currSeq,
    currName: getItemCurrencyName(item, headcount),
    priceSeq: item.priceSeq,
    modelSeq: getModelSeq(item, headcount),
    appYm: getMatchedRule(item, headcount)?.appYm ?? item.appYm,
    smPriceType: getMatchedRule(item, headcount)?.smPriceType ?? item.smPriceType,
    userCount: headcount,
  };
}

function NativeCheckbox({
                          checked,
                          disabled,
                          onChange,
                          ariaLabel,
                        }: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}) {
  return (
      <input
          type="checkbox"
          aria-label={ariaLabel}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 cursor-pointer rounded border-2 border-border accent-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
  );
}

function NativeRadio({
                       id,
                       name,
                       value,
                       checked,
                       disabled,
                       onChange,
                     }: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
      <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => e.target.checked && onChange(e.target.value)}
          className="h-4 w-4 cursor-pointer accent-primary disabled:cursor-not-allowed"
      />
  );
}

const normalizePromotionKey = (value?: string) =>
    (value ?? "").replace(/\s+/g, "").toLowerCase();

const getServicePromotion = (service: Service) => {
  const serviceName = normalizePromotionKey(service.serviceName);

  if (serviceName.includes("에버웰커밍")) {
    return { text: "평생무료", tone: "free" as PromotionBubbleTone };
  }

  return null;
};

const getPlanPromotion = (service: Service, plan: PlanItem) => {
  const serviceName = normalizePromotionKey(service.serviceName);
  const planName = normalizePromotionKey(plan.planName);

  if (serviceName.includes("에버타임") && planName.includes("스탠다드")) {
    return {
      text: "1개월 무료 · 결제수단 등록 시 6개월 추가 무료",
      tone: "evertime" as PromotionBubbleTone,
    };
  }

  return null;
};

function PromotionBubble({
                           text,
                           tone,
                         }: {
  text: string;
  tone: PromotionBubbleTone;
}) {
  const toneClass =
      tone === "free"
          ? "border-emerald-600 bg-emerald-600 text-white shadow-[0_8px_18px_rgba(5,150,105,0.28)] before:border-emerald-600 before:bg-emerald-600"
          : "border-blue-600 bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.28)] before:border-blue-600 before:bg-blue-600";

  return (
      <span
          className={`relative inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-extrabold leading-tight shadow-md before:absolute before:-bottom-1 before:left-5 before:h-2 before:w-2 before:rotate-45 before:border-b before:border-r ${toneClass}`}
      >
        <Gift className="h-4 w-4 shrink-0" />
        <span className="min-w-0 whitespace-normal sm:whitespace-nowrap">{text}</span>
      </span>
  );
}

function RollingDigit({ digit }: { digit: string }) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const target = Number.isNaN(Number(digit)) ? -1 : Number(digit);

  if (target < 0) {
    return <span className="inline-block w-[0.5em] text-center">{digit}</span>;
  }

  return (
      <span className="relative inline-flex h-[1.05em] w-[0.72em] overflow-hidden align-middle">
      <motion.span
          className="absolute left-0 top-0 flex flex-col"
          animate={{ y: `-${target * 1.05}em` }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {digits.map((value) => (
            <span
                key={value}
                className="h-[1.05em] leading-[1.05em] text-center"
            >
            {value}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingPrice({ value, currName }: { value: number; currName?: string }) {
  const formatted = Math.max(0, Math.round(value)).toLocaleString("ko-KR");

  return (
      <span className="inline-flex items-center gap-0.5 text-3xl font-bold tracking-tight text-slate-900">
      {formatted.split("").map((digit, index) => (
          <RollingDigit key={`${digit}-${index}`} digit={digit} />
      ))}
        <span className="ml-1 text-lg font-semibold text-slate-500">
        {getCurrencyLabel(currName)}
      </span>
      </span>
  );
}

function SummaryCard({
                       displayTotal,
                       displayCurrencyName,
                       selectedItems,
                       hasQuoteOnly,
                       onSubscribe,
                       onEstimate,
                       className,
                       scrollClassName,
                     }: SummaryCardProps) {
  return (
      <Card
          className={`overflow-hidden border-0 shadow-xl ${className ?? ""}`}
          style={{background: "linear-gradient(to bottom right, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}
      >
        <CardHeader className="gap-0 px-6 py-0 text-white">
          <CardTitle className="flex items-center justify-between text-2xl">
            <span className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              월 예상금액
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 rounded-t-2xl bg-white p-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 text-center">
            <RollingPrice value={displayTotal} currName={displayCurrencyName} />

            <div className="mt-3 text-xs text-slate-400">
              가격정책에 따라 기본요금과 인당요금이 자동 계산됩니다.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-slate-500">선택 서비스</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {selectedItems.length}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-slate-500">견적요청 항목</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {selectedItems.filter((item) => item.quoteOnly).length}
              </div>
            </div>
          </div>

          {hasQuoteOnly && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                견적요청 항목이 포함되어 있습니다. 담당자가 별도로 연락드립니다.
              </div>
          )}

          <Separator className="bg-slate-200" />

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calculator className="h-4 w-4 text-primary" />
              {selectedItems.length === 0 ? "선택 가이드" : "선택 상세"}
            </div>

            <ScrollArea className={scrollClassName ?? (selectedItems.length === 0 ? "h-[188px] pr-3" : "h-[280px] pr-3")}>
              <div className="space-y-2">
                {selectedItems.length === 0 ? (
                    <div className="space-y-2">
                      {[
                        "필요한 서비스를 체크하면 월 예상금액이 바로 계산됩니다",
                        "인원 수를 바꾸면 구간별 단가가 자동 반영됩니다",
                        "견적요청 항목은 별도 상담으로 이어집니다",
                      ].map((text) => (
                          <div key={text} className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                            {text}
                          </div>
                      ))}
                    </div>
                ) : (
                    selectedItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
                                item.name.startsWith("└")
                                    ? "ml-4 border-slate-200 bg-slate-50"
                                    : "border-primary/30 bg-primary/5"
                            }`}
                        >
                          <span className="min-w-0 text-sm font-medium text-slate-700">
                            {item.name}
                          </span>
                          <span className="shrink-0 text-sm font-semibold text-slate-900">
                            {item.quoteOnly
                                ? "견적요청"
                                : item.groupOnly
                                    ? "하위 항목 기준"
                                    : currency(item.price ?? item.amount ?? 0, item.currName)}
                          </span>
                        </div>
                    ))
                )}
              </div>
            </ScrollArea>
          </div>

          <Separator className="bg-slate-200" />

          <div className="space-y-3">
            <Button
                className="h-12 w-full border-0 text-base font-semibold text-white"
                style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}
                disabled={selectedItems.length === 0 || hasQuoteOnly}
                onClick={onSubscribe}
            >
              구독하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {hasQuoteOnly && (
                <p className="text-center text-xs text-slate-400">
                  견적요청 항목이 포함되어 구독하기를 바로 진행할 수 없습니다.
                </p>
            )}

            <Button
                variant="outline"
                className="h-12 w-full border-2 border-slate-200 text-base font-semibold hover:bg-slate-50"
                onClick={onEstimate}
                disabled={selectedItems.length === 0}
            >
              견적 요청하기
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}

function ServiceRow({
                      service,
                      selected,
                      plans,
                      headcounts,
                      open,
                      onToggleSelected,
                      onChangePlan,
                      onChangeHeadcount,
                      onToggleOpen,
                      onOpenDetail,
                    }: {
  service: Service;
  selected: SelectedState;
  plans: PlanState;
  headcounts: HeadcountState;
  open: OpenState;
  onToggleSelected: (id: string, checked: boolean) => void;
  onChangePlan: (id: string, planId: string) => void;
  onChangeHeadcount: (id: string, value: number) => void;
  onToggleOpen: (id: string) => void;
  onOpenDetail: (target: DetailTarget) => void;
}) {
  const serviceId = service.serviceId;
  const isSelected = !!selected[serviceId];

  const currentPlanId = plans[serviceId];
  const currentPlan = service.plans?.find((p) => p.planId === currentPlanId);

  const allowedSubServices = currentPlan?.allowedChildren || [];
  const visibleSubServices =
      service.subServices?.filter((sub) =>
          allowedSubServices.includes(sub.serviceId)
      ) || [];

  const hasSubServices = visibleSubServices.length > 0;
  const headcount = headcounts[serviceId] || 0;
  const unitPrice = getServiceUnitPrice(service, currentPlan, headcount);
  const servicePromotion = getServicePromotion(service);
  const currentPlanPromotion = currentPlan
      ? getPlanPromotion(service, currentPlan)
      : null;

  const isGroupPlan = !!currentPlan?.isGroupService;
  const isQuoteOnlyPlan = !!currentPlan?.quoteOnly;
  const isQuoteOnlyService = !!service.quoteOnly || isQuoteOnlyPlan;
  const isParentChargeTarget = !isGroupPlan && !isQuoteOnlyService;

  let serviceTotal = 0;

  if (isSelected) {

    // 하위 선택형 플랜
    if (isGroupPlan) {

      visibleSubServices.forEach((sub) => {
        if (selected[sub.serviceId] && !sub.quoteOnly) {
          const subHeadcount = headcounts[sub.serviceId] || headcount;

          serviceTotal += getItemTotal(sub, subHeadcount);
        }
      });

    } else {

      // 일반 서비스는 본인 금액만
      if (isParentChargeTarget) {
        serviceTotal = getItemTotal(currentPlan ?? service, headcount);
      }

    }
  }

  return (
      <motion.div
          layout
          className={`rounded-2xl border-2 transition-all overflow-hidden ${
              isSelected
                  ? "border-primary/50 bg-white shadow-lg shadow-primary/10"
                  : "border-slate-200 bg-white hover:border-primary/30 hover:shadow-md"
          }`}
      >
        <div className="p-4 space-y-3">
          {/* Main Row */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 md:justify-between">
            {/* Top / Left: Checkbox + Service Name + Badge */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <NativeCheckbox
                    checked={isSelected}
                    onChange={(checked) => onToggleSelected(serviceId, checked)}
                    ariaLabel={`${service.serviceName} 선택`}
                />
              </div>
              <div className="min-w-0 flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-slate-900">{service.serviceName}</span>
                {servicePromotion && (
                    <PromotionBubble text={servicePromotion.text} tone={servicePromotion.tone} />
                )}
                {!isSelected && currentPlanPromotion && (
                    <PromotionBubble
                        text={`${currentPlan?.planName} ${currentPlanPromotion.text}`}
                        tone={currentPlanPromotion.tone}
                    />
                )}
                {service.quoteOnly && (
                    <Badge variant="outline" className="text-slate-500 border-slate-300 text-xs">
                      별도견적
                    </Badge>
                )}
                {isSelected && !isQuoteOnlyService && (
                    <div className="flex items-center gap-1">
                      <Badge
                          className="text-white border-0 text-xs"
                          style={{
                            background:
                                "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                          }}
                      >
                        선택됨
                      </Badge>
                    </div>
                )}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-primary hover:bg-primary/10"
                    onClick={() =>
                        onOpenDetail({
                          item: service,
                          currentItem: currentPlan ?? service,
                          headcount,
                          plans: service.plans,
                          selectedPlanId: currentPlanId,
                        })
                    }
                >
                  자세히보기
                </Button>
              </div>
            </div>

            {/* Bottom(mobile) / Middle(desktop): Pricing Info + Total + Chevron */}
            <div className="flex items-center gap-2 pl-7 md:pl-0">
              {isParentChargeTarget && (
                  <div className="flex items-center gap-2 flex-1 md:flex-none flex-wrap">
                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap">요금 기준</span>
                    <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">
                      {perPerson(unitPrice, getItemCurrencyName(currentPlan ?? service, headcount))}
                    </span>
                    <div className="h-3 w-px bg-slate-300" />
                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap">인원</span>
                    <Input
                        type="number"
                        min={0}
                        value={headcount}
                        disabled={!isSelected}
                        onChange={(e) =>
                            onChangeHeadcount(
                                serviceId,
                                Number(e.target.value || 0)
                            )
                        }
                        className="h-7 w-16 border-slate-200 bg-white text-xs"
                    />
                    <span className="text-xs text-slate-500 whitespace-nowrap">명</span>
                  </div>
              )}

              <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-lg font-bold text-slate-900 whitespace-nowrap">

                    {isGroupPlan && serviceTotal > 0 && (
                        <Badge
                            variant="outline"
                            className="border-emerald-300 bg-emerald-50 text-emerald-700 text-[11px]"
                        >
                          하위 포함
                        </Badge>
                    )}

                    {isQuoteOnlyService ? (
                        <span
                            className="font-bold text-sm"
                            style={{
                              background:
                                  "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                        >
                          견적요청
                        </span>
                    ) : isGroupPlan ? (
                        serviceTotal > 0 ? (
                            currency(serviceTotal, getItemCurrencyName(currentPlan ?? service, headcount))
                        ) : (
                            <span className="text-sm text-slate-400">
                              하위 항목 선택
                            </span>
                        )
                    ) : (
                        currency(serviceTotal, getItemCurrencyName(currentPlan ?? service, headcount))
                    )}
                  </div>
                </div>

                {hasSubServices && isSelected && (
                    <button
                        type="button"
                        onClick={() => onToggleOpen(serviceId)}
                        className="rounded-full p-1.5 transition hover:bg-slate-100 flex-shrink-0"
                        aria-label="하위 서비스 열기"
                    >
                      {open[serviceId] ? (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                      ) : (
                          <ChevronRight className="h-5 w-5 text-slate-500" />
                      )}
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Plans Row - Shows below when selected */}
          {isSelected && service.plans && service.plans.length > 0 && (
              <div className="flex items-center gap-3 pl-10 pt-1">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">플랜</span>
                <div className="flex flex-wrap items-end gap-2">
                  {service.plans.map((plan) => {
                    const isCurrentPlan = currentPlanId === plan.planId;
                    const planPromotion = getPlanPromotion(service, plan);

                    return (
                        <div
                            key={plan.planId}
                            className={`flex max-w-full ${planPromotion ? "flex-col items-start gap-1.5" : "items-center gap-2"}`}
                        >
                          {planPromotion && (
                              <PromotionBubble text={planPromotion.text} tone={planPromotion.tone} />
                          )}
                          <Label
                            htmlFor={`${serviceId}-${plan.planId}`}
                            className={`flex cursor-pointer items-center gap-1 rounded-full border-2 px-3 py-1.5 text-xs transition flex-shrink-0 ${
                                isCurrentPlan
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/40"
                            }`}
                        >
                          <NativeRadio
                              id={`${serviceId}-${plan.planId}`}
                              name={`plan-${serviceId}`}
                              value={plan.planId}
                              checked={isCurrentPlan}
                              disabled={!isSelected}
                              onChange={(value) => onChangePlan(serviceId, value)}
                          />
                          <span className="font-medium">{plan.planName}</span>
                          <span className="text-slate-500">
                          {plan.isGroupService
                              ? ""
                              : plan.quoteOnly
                                  ? "별도견적"
                                  : perPerson(
                                      getItemUnitPrice(plan, headcounts[serviceId] || plan.defaultUsercount || 0),
                                      getItemCurrencyName(plan, headcounts[serviceId] || plan.defaultUsercount || 0)
                                  )}
                        </span>
                        </Label>
                        </div>
                    );
                  })}
                </div>
              </div>
          )}
        </div>

        {hasSubServices && isSelected && (
            <AnimatePresence initial={false}>
              {open[serviceId] && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                  >
                    <div className="border-t border-slate-200 bg-slate-50 px-4 pt-3 pb-4">
                      <div className="mb-3 text-xs font-medium text-slate-400">
                        선택 가능한 하위 서비스
                      </div>

                      <div className="space-y-2">
                      {visibleSubServices.map((sub) => {
                        const subId = sub.serviceId;
                        const isSubSelected = !!selected[subId];
                        const subHeadcount = headcounts[subId] || headcount;
                        const subTotal = sub.quoteOnly
                            ? 0
                            : getItemTotal(sub, subHeadcount);

                        return (
                            <div
                                key={subId}
                                className={`rounded-xl border bg-white p-2.5 transition ${
                                    isSubSelected
                                        ? "border-primary/40 shadow-sm"
                                        : "border-slate-200"
                                }`}
                            >
                              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 xl:grid-cols-[auto_minmax(0,1fr)_auto]">
                                <div className="flex items-center">
                                  <NativeCheckbox
                                      checked={isSubSelected}
                                      onChange={(checked) =>
                                          onToggleSelected(subId, checked)
                                      }
                                      ariaLabel={`${sub.serviceName} 선택`}
                                      disabled={!isSelected}
                                  />
                                </div>

                                <div className="flex min-w-0 items-center gap-1.5">
                                  <span className="truncate text-sm font-semibold text-slate-900">{sub.serviceName}</span>
                                  {isSubSelected && !sub.quoteOnly && (
                                      <Badge
                                          className="shrink-0 border-0 text-[10px] text-white"
                                          style={{
                                            background:
                                                "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)",
                                          }}
                                      >
                                        선택됨
                                      </Badge>
                                  )}
                                  {sub.quoteOnly && (
                                      <Badge variant="outline" className="w-fit shrink-0 border-slate-300 text-xs text-slate-500">
                                        견적요청
                                      </Badge>
                                  )}
                                  <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 shrink-0 px-1.5 text-[11px] text-primary hover:bg-primary/10"
                                      onClick={() =>
                                          onOpenDetail({
                                            item: sub,
                                            currentItem: sub,
                                            headcount: subHeadcount,
                                          })
                                      }
                                  >
                                    자세히보기
                                  </Button>
                                </div>

                                <div className="col-start-2 flex min-w-0 items-center gap-1.5 xl:col-start-auto">
                                  {!sub.quoteOnly ? (
                                      <>
                                        <span className="whitespace-nowrap text-[11px] font-medium text-slate-500">요금 기준</span>
                                        <span className="whitespace-nowrap text-[11px] font-semibold text-slate-900">
                                          {perPerson(getItemUnitPrice(sub, subHeadcount), getItemCurrencyName(sub, subHeadcount))}
                                        </span>
                                        <div className="h-3 w-px shrink-0 bg-slate-300" />
                                        <span className="whitespace-nowrap text-[11px] font-medium text-slate-500">인원</span>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={subHeadcount}
                                            disabled={!isSelected || !isSubSelected}
                                            onChange={(e) =>
                                                onChangeHeadcount(
                                                    subId,
                                                    Number(e.target.value || 0)
                                                )
                                            }
                                            className="h-7 w-12 border-slate-200 bg-white px-1 text-center text-xs sm:w-14"
                                        />
                                        <span className="whitespace-nowrap text-[11px] text-slate-500">명</span>
                                        <span className="ml-auto min-w-[78px] whitespace-nowrap text-right text-sm font-bold text-slate-900 xl:ml-2">
                                          {currency(subTotal, getItemCurrencyName(sub, subHeadcount))}
                                        </span>
                                      </>
                                  ) : (
                                      <span className="text-sm text-slate-500 whitespace-nowrap">견적요청</span>
                                  )}
                                </div>
                              </div>
                            </div>
                        );
                      })}
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
        )}
      </motion.div>
  );
}

function SubscribeContent() {
  const router = useRouter();
  const isLoggedIn = useLoginStatus();

  const initialConfig = sortServiceConfig(fallbackServiceConfig);

  const [serviceConfig, setserviceConfig] = useState<Category[]>(initialConfig);
  const [isServiceLoading, setIsServiceLoading] = useState(true);

  const [selected, setSelected] = useState<SelectedState>(() =>
      buildInitialSelected(initialConfig)
  );

  const [plans, setPlans] = useState<PlanState>(() =>
      buildInitialPlans(initialConfig)
  );

  const [headcounts, setHeadcounts] = useState<HeadcountState>(() =>
      buildInitialHeadcount(initialConfig)
  );

  const [open, setOpen] = useState<OpenState>(() =>
      buildInitialOpen(initialConfig)
  );

  const [displayTotal, setDisplayTotal] = useState(0);

  const [detailItem, setDetailItem] = useState<DetailTarget | null>(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  const applySelectionState = (config: Category[]) => {
    const snapshot = readSubscribeSelectionSnapshot();

    setSelected(mergeKnownKeys(buildInitialSelected(config), snapshot?.selected));
    setPlans(mergeKnownKeys(buildInitialPlans(config), snapshot?.plans));
    setHeadcounts(mergeKnownKeys(buildInitialHeadcount(config), snapshot?.headcounts));
    setOpen(buildInitialOpen(config));
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const api = new ApiSubscribe();
        const portalId = "EVERIN";
        const json = await api.getSubscribeServices(portalId);

        if (!json.serviceConfig || json.serviceConfig.length === 0) {
          setserviceConfig([]);
          applySelectionState([]);
          return;
        }

        const nextConfig = sortServiceConfig(json.serviceConfig);

        setserviceConfig(nextConfig);
        applySelectionState(nextConfig);
        /*setActiveCategoryId(nextConfig[0].categoryId);*/
      } catch (error) {
        console.error("서비스 견적 API 호출 실패", error);
        setserviceConfig([]);
        applySelectionState([]);
      } finally {
        setIsServiceLoading(false);
      }
    };

    loadServices();
  }, []);

  const total = useMemo(() => {
    let sum = 0;

    serviceConfig.forEach((cat) => {
      cat.services.forEach((svc) => {
        if (selected[svc.serviceId]) {
          const plan = svc.plans?.find(
              (p) => p.planId === plans[svc.serviceId]
          );

          const headcount = headcounts[svc.serviceId] || 0;
          const isQuoteOnlyService = svc.quoteOnly || plan?.quoteOnly;
          const isGroupPlan = !!plan?.isGroupService;

          if (!isQuoteOnlyService && !isGroupPlan) {
            sum += getItemTotal(plan ?? svc, headcount);
          }

          const allowedSubs = plan?.allowedChildren || [];

          svc.subServices?.forEach((sub) => {
            if (
                allowedSubs.includes(sub.serviceId) &&
                selected[sub.serviceId] &&
                !sub.quoteOnly
            ) {
              const subHeadcount = headcounts[sub.serviceId] || headcount;
              sum += getItemTotal(sub, subHeadcount);
            }
          });
        }
      });
    });

    return sum;
  }, [serviceConfig, selected, plans, headcounts]);

  useEffect(() => {
    let frame = 0;
    const start = displayTotal;
    const end = total;
    const duration = 400;
    const startAt = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayTotal(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [total]);

  const selectedItems = useMemo(() => {
    const items: SelectedSummaryItem[] = [];

    serviceConfig.forEach((cat) => {
      cat.services.forEach((svc) => {
        if (selected[svc.serviceId]) {
          const plan = svc.plans?.find(
              (p) => p.planId === plans[svc.serviceId]
          );

          const headcount = headcounts[svc.serviceId] || 0;

          items.push(buildSubscribeSelectionItem({
            item: plan ?? svc,
            parent: svc,
            plan,
            headcount,
            name: plan
                ? `${svc.serviceName} (${plan.planName})`
                : svc.serviceName,
            quoteOnly: svc.quoteOnly || plan?.quoteOnly,
            groupOnly: !!plan?.isGroupService,
          }));

          const allowedSubs = plan?.allowedChildren || [];

          svc.subServices?.forEach((sub) => {
            if (allowedSubs.includes(sub.serviceId) && selected[sub.serviceId]) {
              const subHeadcount = headcounts[sub.serviceId] || headcount;

              items.push(buildSubscribeSelectionItem({
                item: sub,
                parent: svc,
                plan,
                headcount: subHeadcount,
                name: `ㄴ ${sub.serviceName}`,
                quoteOnly: sub.quoteOnly,
              }));
            }
          });
        }
      });
    });

    return items;
  }, [serviceConfig, selected, plans, headcounts]);

  const hasQuoteOnly = selectedItems.some((item) => item.quoteOnly);
  const displayCurrencyName = selectedItems.find((item) => !item.quoteOnly)?.currName;

  const buildSelectionSnapshot = (): SubscribeSelectionSnapshot => ({
    selected,
    plans,
    headcounts,
    items: selectedItems.map((item) => ({
      ...item,
      amount: Number(item.amount ?? item.price ?? 0),
      unitPrice: Number(item.unitPrice ?? 0),
    })) as SubscribeSelectionItem[],
    total,
    hasQuoteOnly,
    portalId: "EVERIN",
    savedAt: new Date().toISOString(),
  });

  const persistSelectionSnapshot = () => {
    writeSubscribeSelectionSnapshot(buildSelectionSnapshot());
  };

  const getStep2Url = () => {
    const params = new URLSearchParams();

    params.set("total", total.toString());
    params.set("hasQuoteOnly", hasQuoteOnly.toString());
    params.set("source", "bms");

    return `/subscribe/step2?${params.toString()}`;
  };

  const handleSubscribeRequest = () => {
    persistSelectionSnapshot();

    const step2Url = getStep2Url();

    if (!isLoggedIn) {
      router.push(`/login?url=${encodeURIComponent("/subscribe")}`);
      return;
    }

    router.push(step2Url);
  };

  const toggleSelected = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  const changePlan = (serviceId: string, planId: string) => {
    setPlans((prev) => ({ ...prev, [serviceId]: planId }));

    const service = serviceConfig
        .flatMap((category) => category.services)
        .find((svc) => svc.serviceId === serviceId);

    if (!service?.subServices) return;

    const nextPlan = service.plans?.find((plan) => plan.planId === planId);
    const allowedSubs = nextPlan?.allowedChildren || [];

    if (nextPlan?.defaultUsercount) {
      setHeadcounts((prev) => ({ ...prev, [serviceId]: nextPlan.defaultUsercount || prev[serviceId] || 10 }));
    }

    setSelected((prev) => {
      const updated = { ...prev };

      service.subServices?.forEach((sub) => {
        if (!allowedSubs.includes(sub.serviceId)) {
          updated[sub.serviceId] = false;
        }
      });

      return updated;
    });
  };

  const changeHeadcount = (id: string, value: number) => {
    const safeValue = Math.max(0, Math.floor(value || 0));
    setHeadcounts((prev) => ({ ...prev, [id]: safeValue }));
  };

  const toggleOpen = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEstimateRequest = () => {
    persistSelectionSnapshot();

    const params = new URLSearchParams();

    params.set("total", total.toString());
    params.set("hasQuoteOnly", hasQuoteOnly.toString());

    router.push(`/subscribe/step2?${params.toString()}`);
  };

  if (isServiceLoading) {
    return null;
  }

  if (serviceConfig.length === 0) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Header />
          <main className="flex flex-1 items-center justify-center px-4 py-20">
            <Card className="w-full max-w-xl border-slate-200 bg-white text-center shadow-sm">
              <CardContent className="px-6 py-16">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Calculator className="h-7 w-7 text-slate-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">요금제 준비중입니다.</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  현재 표시할 수 있는 요금제 데이터가 없습니다.
                </p>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
    );
  }

  return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />

        <main className="flex-1 pb-24 lg:pb-0">
          <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-8">
                {serviceConfig.map((category) => (
                    <div key={category.categoryId}>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-10 w-1.5 rounded-full" style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}} />
                        <h2 className="text-2xl font-bold text-slate-900">
                          {category.categoryName}
                        </h2>
                        <Badge className="ml-2 bg-slate-100 text-slate-700 border-slate-200">
                          {category.services.length}개 서비스
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        {category.services.map((service) => (
                            <ServiceRow
                                key={service.serviceId}
                                service={service}
                                selected={selected}
                                plans={plans}
                                headcounts={headcounts}
                                open={open}
                                onToggleSelected={toggleSelected}
                                onChangePlan={changePlan}
                                onChangeHeadcount={changeHeadcount}
                                onToggleOpen={toggleOpen}
                                onOpenDetail={setDetailItem}
                            />
                        ))}
                      </div>
                    </div>
                ))}
              </div>

              {/* Summary Card */}
              <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
                <Card className="overflow-hidden border-0 shadow-xl" style={{background: "linear-gradient(to bottom right, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}>
                  <CardHeader className="gap-0 px-6 py-0 text-white">
                    <CardTitle className="flex items-center justify-between text-2xl">
                      <span className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        월 예상금액
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-5 bg-white rounded-t-2xl p-6">
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 text-center">
                      <RollingPrice value={displayTotal} currName={displayCurrencyName} />

                      <div className="mt-3 text-xs text-slate-400">
                        가격정책에 따라 기본요금과 인당요금이 자동 계산됩니다.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                        <div className="text-slate-500">선택 서비스</div>
                        <div className="mt-1 text-2xl font-bold text-slate-900">
                          {selectedItems.length}
                        </div>
                      </div>

                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                        <div className="text-slate-500">견적요청 항목</div>
                        <div className="mt-1 text-2xl font-bold text-slate-900">
                          {selectedItems.filter((item) => item.quoteOnly).length}
                        </div>
                      </div>
                    </div>

                    {hasQuoteOnly && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                          견적요청 항목이 포함되어 있습니다. 담당자가 별도로 연락드립니다.
                        </div>
                    )}

                    <Separator className="bg-slate-200" />

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Calculator className="h-4 w-4 text-primary" />
                        {selectedItems.length === 0 ? "선택 가이드" : "선택 상세"}
                      </div>

                      <ScrollArea className={selectedItems.length === 0 ? "h-[188px] pr-3" : "h-[280px] pr-3"}>
                        <div className="space-y-2">
                          {selectedItems.length === 0 ? (
                              <div className="space-y-2">
                                {[
                                  "필요한 서비스를 체크하면 월 예상금액이 바로 계산됩니다",
                                  "인원 수를 바꾸면 구간별 단가가 자동 반영됩니다",
                                  "견적요청 항목은 별도 상담으로 이어집니다",
                                ].map((text) => (
                                  <div key={text} className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                                    {text}
                                  </div>
                                ))}
                              </div>
                          ) : (
                              selectedItems.map((item, idx) => (
                                  <div
                                      key={idx}
                                      className={`flex items-center justify-between rounded-xl border p-3 ${
                                          item.name.startsWith("ㄴ")
                                              ? "ml-4 border-slate-200 bg-slate-50"
                                              : "border-primary/30 bg-primary/5"
                                      }`}
                                  >
                              <span className="text-sm font-medium text-slate-700">
                                {item.name}
                              </span>
                                    <span className="text-sm font-semibold text-slate-900">
                                {item.quoteOnly
                                    ? "견적요청"
                                    : item.groupOnly
                                        ? "하위 항목 기준"
                                        : currency(item.price ?? item.amount ?? 0, item.currName)}
                              </span>
                                  </div>
                              ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>

                    <Separator className="bg-slate-200" />

                    <div className="space-y-3">
                      <Button
                          className="w-full h-12 text-base font-semibold text-white border-0"
                          style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}
                          disabled={selectedItems.length === 0 || hasQuoteOnly}
                          onClick={handleSubscribeRequest}
                      >
                        구독하기
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>

                      {hasQuoteOnly && (
                          <p className="text-center text-xs text-slate-400">
                            견적요청 항목이 포함되어 구독하기를 바로 진행할 수 없습니다.
                          </p>
                      )}

                      <Button
                          variant="outline"
                          className="w-full h-12 text-base font-semibold border-2 border-slate-200 hover:bg-slate-50"
                          onClick={handleEstimateRequest}
                          disabled={selectedItems.length === 0}
                      >
                        견적 요청하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <div className="lg:hidden">
          <AnimatePresence>
            {isMobileSummaryOpen && (
                <motion.button
                    type="button"
                    aria-label="월 예상금액 닫기"
                    className="fixed inset-0 z-40 bg-slate-950/35"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileSummaryOpen(false)}
                />
            )}
          </AnimatePresence>

          <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)]">
            <AnimatePresence initial={false}>
              {isMobileSummaryOpen && (
                  <motion.div
                      className="mb-3 max-h-[calc(100vh-118px)] overflow-y-auto rounded-[24px]"
                      initial={{ y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 28, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  >
                    <SummaryCard
                        displayTotal={displayTotal}
                        displayCurrencyName={displayCurrencyName}
                        selectedItems={selectedItems}
                        hasQuoteOnly={hasQuoteOnly}
                        onSubscribe={handleSubscribeRequest}
                        onEstimate={handleEstimateRequest}
                        scrollClassName={selectedItems.length === 0 ? "h-[138px] pr-3" : "h-[180px] pr-3"}
                    />
                  </motion.div>
              )}
            </AnimatePresence>

            <button
                type="button"
                aria-expanded={isMobileSummaryOpen}
                onClick={() => setIsMobileSummaryOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,0.18)]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}
                >
                  <Calculator className="h-4 w-4" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-xs font-semibold text-slate-500">월 예상금액</span>
                  <span className="block truncate text-lg font-bold text-slate-950">
                    {currency(displayTotal, displayCurrencyName)}
                  </span>
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-2 text-sm font-bold text-primary">
                {isMobileSummaryOpen ? "닫기" : "보기"}
                <ChevronDown className={`h-5 w-5 transition-transform ${isMobileSummaryOpen ? "" : "rotate-180"}`} />
              </span>
            </button>
          </div>
        </div>

        {detailItem && (
            <PriceDetailPanel
                target={detailItem}
                onClose={() => setDetailItem(null)}
            />
        )}
        <Footer />
      </div>
  );
}

function PriceDetailPanel({
                            target,
                            onClose,
                          }: {
  target: DetailTarget;
  onClose: () => void;
}) {

  const baseItem = target.item;
  const headcount = target.headcount;
  const plans = target.plans ?? [];

  const [detailPlanId, setDetailPlanId] = useState(
      target.selectedPlanId ?? plans[0]?.planId
  );

  useEffect(() => {
    setDetailPlanId(target.selectedPlanId ?? plans[0]?.planId);
  }, [target]);

  const selectedPlan = plans.find((p) => p.planId === detailPlanId);

  const item = selectedPlan ?? target.currentItem;

  const rules = item.priceRules ?? [];
  const matchedRule = getMatchedRule(item, headcount);
  const total = getItemTotal(item, headcount);
  const unitPrice = getItemUnitPrice(item, headcount);

  return (
      <AnimatePresence>
        <motion.div
            key="price-detail-backdrop"
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        />

        <motion.aside
            key="price-detail-panel"
            className="fixed bottom-0 right-0 z-50 h-[82vh] w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl md:bottom-auto md:top-0 md:h-full md:max-w-[520px] md:rounded-l-3xl md:rounded-t-none"
            initial={{ x: "100%", y: 40 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: "100%", y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <div className="flex h-full min-h-0 flex-col">
            <div className="shrink-0 border-b p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">
                    가격정책
                  </Badge>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {baseItem.serviceName || item.serviceName || item.planName}
                  </h3>
                  {item.description && (
                      <p className="mt-2 text-sm text-slate-500">
                        {item.description}
                      </p>
                  )}
                </div>

                <Button variant="ghost" size="sm" onClick={onClose}>
                  닫기
                </Button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="space-y-4 p-4 pb-10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border bg-slate-50 p-2">
                    <div className="pl-2 text-xs font-medium tracking-tight text-slate-500">현재 요금 기준</div>
                    <div className="pl-2 mt-1 text-l font-bold text-slate-900">
                      {perPerson(unitPrice, getItemCurrencyName(item, headcount))}
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-slate-50 p-2">
                    <div className="pl-2 text-xs font-medium tracking-tight text-slate-500">현재 총금액</div>
                    <div className="pl-2 mt-1 text-l font-bold text-slate-900">
                      {currency(total, getItemCurrencyName(item, headcount))}
                    </div>
                  </div>
                </div>

                {matchedRule && (
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="font-semibold text-primary">
                          현재 적용 구간
                        </div>

                        <div className="text-right">
                          <div className="text-slate-700">
                            {matchedRule.smPriceType === 2039002
                                ? `${matchedRule.perFr}명 초과 ~ ${matchedRule.perTo}명 이하`
                                : "인원 구간과 관계없이 동일 단가 적용"}
                          </div>

                          <div className="mt-1 text-slate-500">
                            기본단가 {currency(matchedRule.basicPrice ?? 0, matchedRule.currName)} + 단가{" "}
                            {currency(matchedRule.currPrice ?? 0, matchedRule.currName)}
                          </div>
                        </div>
                      </div>
                    </div>
                )}
                {plans.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-bold text-slate-900">
                        플랜별 가격 비교
                      </h4>

                      <div className="space-y-2">
                        {plans.map((plan) => {
                          const planTotal = plan.quoteOnly ? 0 : getItemTotal(plan, headcount);
                          const planUnit = plan.quoteOnly ? 0 : getItemUnitPrice(plan, headcount);
                          const isSelected = plan.planId === detailPlanId;

                          return (
                              <div
                                  key={plan.planId}
                                  onClick={() => setDetailPlanId(plan.planId)}
                                  className={`cursor-pointer rounded-2xl border p-3 transition hover:border-primary/60 hover:bg-primary/5 ${
                                      isSelected
                                          ? "border-primary bg-primary/5"
                                          : "border-slate-200 bg-white"
                                  }`}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div>
                                    <div className="font-bold text-slate-900">
                                      {plan.planName}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500">
                                      {plan.isGroupService
                                          ? "하위 항목 기준"
                                          : plan.quoteOnly
                                              ? "별도견적"
                                          : perPerson(planUnit, getItemCurrencyName(plan, headcount))}
                                    </div>
                                  </div>

                                  <div className="text-right text-sm font-bold text-slate-900">
                                    {plan.isGroupService
                                        ? ""
                                        : plan.quoteOnly
                                            ? "견적요청"
                                            : currency(planTotal, getItemCurrencyName(plan, headcount))}
                                  </div>
                                </div>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                )}
                <div>
                  <h4 className="mb-3 text-sm font-bold text-slate-900">
                    {selectedPlan?.planName || "선택 플랜"} 가격정책
                  </h4>

                  <div className="overflow-hidden rounded-2xl border">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-left">구분</th>
                        <th className="px-3 py-2 text-right">범위</th>
                        <th className="px-3 py-2 text-right">기본단가</th>
                        <th className="px-3 py-2 text-right">단가</th>
                      </tr>
                      </thead>
                      <tbody>
                      {rules.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-3 py-6 text-center text-slate-400">
                              등록된 가격정책이 없습니다.
                            </td>
                          </tr>
                      ) : (
                          rules.map((rule: any, idx: number) => (
                              <tr
                                  key={`${rule.seq}-${idx}`}
                                  className={
                                    matchedRule?.seq === rule.seq
                                        ? "bg-primary/5"
                                        : "border-t"
                                  }
                              >
                                <td className="px-3 py-2">
                                  {rule.smPriceTypeName}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {rule.smPriceType === 2039002
                                      ? `${rule.perFr} 초과 ~ ${rule.perTo} 이하`
                                      : "전체"}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {currency(rule.basicPrice ?? 0, rule.currName)}
                                </td>
                                <td className="px-3 py-2 text-right font-semibold">
                                  {currency(rule.currPrice ?? 0, rule.currName)}
                                </td>
                              </tr>
                          ))
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
  );
}

export default function SubscribePage() {
  return (
      <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                </div>
                <p className="text-muted-foreground">로딩 중...</p>
              </div>
            </div>
          }
      >
        <SubscribeContent />
      </Suspense>
  );
}
