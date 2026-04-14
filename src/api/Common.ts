import Config from "@/utils/config";
import {callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";

export default class ApiCommon {
    async getOpenApiToken(userId: number, loginId: string) {
        const url = `${Config.apiServer}/api/v1/tokens/open?userId=${userId}&loginId=${loginId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }
}