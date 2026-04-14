import Config from "@/utils/config";
import {callApi, callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";

export default class ApiPopups {
    async getAvailablePopups() {
        let url = `${Config.apiServer}/api/v1/popups/`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getLatestAvailablePopup() {
        let url = `${Config.apiServer}/api/v1/popups/latest`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }
}