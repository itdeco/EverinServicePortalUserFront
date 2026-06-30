import { NextResponse } from "next/server";

const PAYMENT_INVOICE_PATH =
    process.env.BMS_PAYMENT_INVOICE_PATH || "/VEN.Ylw.ZBM.BssIFPortalPayment/Detail";

const requiredEnvironmentKeys = [
    "BMS_SERVER",
    "BMS_CERT_ID",
    "BMS_CERT_KEY",
    "BMS_DSN_BIS",
    "BMS_DSN_OPER",
] as const;

function createBmsBody(totUserSeq: number, paymentId: string, totCompanySeq?: number) {
    const numericPaymentId = Number(paymentId);
    const paymentKey = Number.isInteger(numericPaymentId) && numericPaymentId > 0
        ? { PaymentLogId: numericPaymentId }
        : { BillNo: paymentId };

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
                        TotUserSeq: totUserSeq,
                        ...paymentKey,
                        ...(totCompanySeq ? { TotCompanySeq: totCompanySeq } : {}),
                    },
                },
            },
        },
    };
}

async function callBms(body: unknown) {
    const missingKeys = requiredEnvironmentKeys.filter((key) => !process.env[key]);
    if (missingKeys.length > 0) {
        throw new Error(`BMS 환경변수가 설정되지 않았습니다: ${missingKeys.join(", ")}`);
    }

    const response = await fetch(`${process.env.BMS_SERVER}${PAYMENT_INVOICE_PATH}`, {
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
        throw new Error(`${PAYMENT_INVOICE_PATH} 호출 실패: ${response.status} / ${text}`);
    }
    if (!text.trim()) {
        throw new Error(`${PAYMENT_INVOICE_PATH} 응답이 비어있습니다.`);
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`${PAYMENT_INVOICE_PATH} 응답을 JSON으로 해석할 수 없습니다.`);
    }
}

export async function POST(req: Request) {
    try {
        const { totUserSeq, paymentId, totCompanySeq } = await req.json();
        const parsedTotUserSeq = Number(totUserSeq);
        const parsedPaymentId = String(paymentId || "").trim();
        const parsedTotCompanySeq = totCompanySeq === undefined || totCompanySeq === null
            ? undefined
            : Number(totCompanySeq);

        if (!Number.isInteger(parsedTotUserSeq) || parsedTotUserSeq <= 0) {
            return NextResponse.json(
                { message: "통합 사용자 SEQ가 없습니다." },
                { status: 400 },
            );
        }
        if (!parsedPaymentId) {
            return NextResponse.json(
                { message: "청구 건 ID가 없습니다." },
                { status: 400 },
            );
        }
        if (
            parsedTotCompanySeq !== undefined
            && (!Number.isInteger(parsedTotCompanySeq) || parsedTotCompanySeq <= 0)
        ) {
            return NextResponse.json(
                { message: "통합 회사 SEQ가 올바르지 않습니다." },
                { status: 400 },
            );
        }

        const invoice = await callBms(
            createBmsBody(parsedTotUserSeq, parsedPaymentId, parsedTotCompanySeq),
        );
        return NextResponse.json(invoice);
    } catch (error) {
        console.error("BMS Payment Invoice API 오류", error);
        return NextResponse.json(
            { message: "BMS 청구 상세 API 처리 중 오류가 발생했습니다." },
            { status: 500 },
        );
    }
}
