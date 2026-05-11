import Config from "@/utils/config";
import { ApiResponse } from "@/types/Common";
import { Category } from "@/types/subscribe";

export default class ApiSubscribe {
    async getSubscribeServices(): Promise<ApiResponse<Category[]>> {
        const url = `${Config.bmsServer}/api/v1/subscribe/services`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`구독 서비스 API 호출 실패: ${response.status}`);
        }

        const text = await response.text();

        if (!text) {
            throw new Error("구독 서비스 API 응답이 비어있습니다.");
        }

        return JSON.parse(text) as ApiResponse<Category[]>;
    }
}