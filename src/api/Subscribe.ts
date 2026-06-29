import { Category } from "@/types/subscribe";

export type SubscribeBmsResponse = {
    serviceConfig: Category[];
    raw: {
        serviceList: unknown;
        priceList: unknown;
    };
};

export type ContractSummary = {
    IdxNo: number;
    TotCompanySeq: number;
    BizCompanySeq: number;
    ClientSeq: number;
    ContSeq: number;
    ContNo: string;
    CompanyName: string;
    ContDate: string;
    ServiceStartDate: string;
    ServiceEndDate: string;
    ContStatus: number;
    ContStatusName: string;
};

export type ContractService = {
    IdxNo: number;
    TotCompanySeq: number;
    BizCompanySeq: number;
    ContSeq: number;
    ContNo: string;
    ServiceItemSeq: number;
    ServiceItemName: string;
    SubServiceItemSeq: number;
    SubServiceItemName: string;
    CurrSeq: number;
    Qty: number;
    Price: number;
    Amt: number;
    PolicySeq: number;
    PriceAppYm: string;
    ServiceStartDate: string;
    ServiceEndDate: string;
};

export type SubscribeContractListResponse = {
    DataBlock1?: ContractSummary[];
    DataBlock2?: ContractService[];
};

export default class ApiSubscribe {
    async getSubscribeServices(portalId: string = "EVERIN"): Promise<SubscribeBmsResponse> {
        const response = await fetch("/api/bms/subscribe", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ portalId }),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`구독 서비스 API 호출 실패: ${response.status}`);
        }

        return await response.json() as SubscribeBmsResponse;
    }

    async getContractList(totUserSeq: number): Promise<SubscribeContractListResponse> {
        const response = await fetch("/api/bms/subscription", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totUserSeq }),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => null);
            throw new Error(errorBody?.message || `BMS 구독 계약 API 호출 실패: ${response.status}`);
        }

        return await response.json() as SubscribeContractListResponse;
    }
}
