import { NextResponse } from "next/server";

const CONTRACT_LIST_PATH = "/VEN.Ylw.ZBM.BssIFPortalContract/List";

const requiredEnvironmentKeys = [
    "BMS_SERVER",
    "BMS_CERT_ID",
    "BMS_CERT_KEY",
    "BMS_DSN_BIS",
    "BMS_DSN_OPER",
] as const;

function createBmsBody(totUserSeq: number) {
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

    const response = await fetch(`${process.env.BMS_SERVER}${CONTRACT_LIST_PATH}`, {
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
        throw new Error(`${CONTRACT_LIST_PATH} 호출 실패: ${response.status} / ${text}`);
    }

    if (!text.trim()) {
        throw new Error(`${CONTRACT_LIST_PATH} 응답이 비어 있습니다.`);
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`${CONTRACT_LIST_PATH} 응답을 JSON으로 해석할 수 없습니다.`);
    }
}

export async function POST(req: Request) {
    try {
        const { totUserSeq } = await req.json();
        const parsedTotUserSeq = Number(totUserSeq);

        if (!Number.isInteger(parsedTotUserSeq) || parsedTotUserSeq <= 0) {
            return NextResponse.json(
                { message: "통합 사용자 SEQ가 없습니다." },
                { status: 400 }
            );
        }

        const contractList = await callBms(createBmsBody(parsedTotUserSeq));

        return NextResponse.json(contractList);
    } catch (error) {
        console.error("BMS Subscription API 오류", error);

        return NextResponse.json(
            { message: "BMS 구독 계약 API 처리 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
