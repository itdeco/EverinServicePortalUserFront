import Config from "@/utils/config";
import {TermsType} from "@/types/Terms";
import {callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";

export default class ApiTerms {
    async getLatestTypeTerms(type: TermsType) {
        const url = `${Config.apiServer}/api/v1/terms/latest?type=${type}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getTerms(termsId: number) {
        const url = `${Config.apiServer}/api/v1/terms/${termsId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }
}