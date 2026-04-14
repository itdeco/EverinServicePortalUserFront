import Config from "@/utils/config";
import {callApi, callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";

export default class ApiCommonCodes {
    async getCommonCodesByCategoryCode(categoryCode: string) {
        const url = `${Config.apiServer}/api/v1/common-codes/category/code/${categoryCode}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getCommonCodesByCategoryId(categoryId: number) {
        const url = `${Config.apiServer}/api/v1/common-codes/${categoryId}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }
}