import Config from "@/utils/config";
import {callApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";

export default class ApiProducts {
    async getAllProducts() {
        let url = `${Config.apiServer}/api/v1/products/`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }
}