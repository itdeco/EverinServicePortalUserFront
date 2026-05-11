import Config from "@/utils/config";
import { callPublicApi } from "@/utils/apiUtil";
import { Method } from "@/api/ApiClient";
import { ApiResponse } from "@/types/Common";
import { Category } from "@/types/subscribe";

export default class ApiSubscribe {

    async getSubscribeServices(): Promise<ApiResponse<Category[]>> {
        const url = `${Config.bmsServer}/api/v1/subscribe/services`;

        const res = await callPublicApi({
            url,
            method: Method.Get,
        });

        if (!res) {
            throw new Error("구독 서비스 API 응답이 없습니다.");
        }

        return (res.payload ?? res) as ApiResponse<Category[]>;
    }
}