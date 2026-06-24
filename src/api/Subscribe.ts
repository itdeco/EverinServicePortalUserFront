import { Category } from "@/types/subscribe";

export type SubscribeBmsResponse = {
    serviceConfig: Category[];
    raw: {
        serviceList: any;
        priceList: any;
    };
};

export type SubscribeContractListResponse = {
    DataBlock1?: any[];
    DataBlock2?: any[];
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
            throw new Error(`BMS 구독 계약 API 호출 실패: ${response.status}`);
        }

        return await response.json() as SubscribeContractListResponse;
    }
}
