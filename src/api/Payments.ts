import {PagedRequestDto} from "@/types/Common";
import Config from "@/utils/config";
import {callApi} from "@/utils/apiUtil";

export default class ApiPayments {
    async getPagedPaymentList(params: PagedRequestDto) {
        let url = `${Config.apiServer}/api/v1/payments/logs?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;

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