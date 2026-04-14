import Config from "@/utils/config";
import {callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";

export default class ApiPlans {
    async getAllPlans() {
        const url = `${Config.apiServer}/api/v1/plans/`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getAllFreePlans() {
        const url = `${Config.apiServer}/api/v1/plans/free`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }
}