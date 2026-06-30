import {PagedRequestDto} from "@/types/Common";
import Config from "@/utils/config";
import {callApi} from "@/utils/apiUtil";

export type BmsPaymentListResponse = {
    DataBlock1?: Record<string, unknown>[];
    totalCount?: number;
    currentPage?: number;
    totalPage?: number;
};

export type BmsPaymentInvoiceResponse = Record<string, unknown>;

export default class ApiPayments {
    async getBmsPaymentList(
        totUserSeq: number,
        totCompanySeq?: number,
    ): Promise<BmsPaymentListResponse> {
        const response = await fetch("/api/bms/payment", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totUserSeq, totCompanySeq }),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => null);
            throw new Error(
                errorBody?.message || `BMS 청구/납부 내역 API 호출 실패: ${response.status}`,
            );
        }

        return await response.json() as BmsPaymentListResponse;
    }

    async getBmsPaymentInvoice(
        totUserSeq: number,
        paymentId: string,
        totCompanySeq?: number,
    ): Promise<BmsPaymentInvoiceResponse> {
        const response = await fetch("/api/bms/payment/invoice", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totUserSeq, paymentId, totCompanySeq }),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => null);
            throw new Error(
                errorBody?.message || `BMS 청구 상세 API 호출 실패: ${response.status}`,
            );
        }

        return await response.json() as BmsPaymentInvoiceResponse;
    }

    async getPagedPaymentList(params: PagedRequestDto & { totCompanySeq?: number }) {
        let url = `${Config.apiServer}/api/v1/payments/logs?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;

        if (params.totCompanySeq) {
            url += `&totCompanySeq=${params.totCompanySeq}`;
        }

        return callApi({
            url: url,
            method: "GET",
        });
    }

    async getPaymentStatus(userId: number, year: number, month: number) {
        let url = `${Config.apiServer}/api/v1/payments/${userId}/status?year=${year}&month=${month}`;

        return callApi({
            url: url,
            method: "GET",
        });
    }
}
