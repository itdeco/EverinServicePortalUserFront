import Config from "@/utils/config";
import {callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";
import {SmsAuthenticationRequestBaseDto, SmsAuthenticationVerifyDto} from "@/types/Users";

export default class ApiSms {
    async requestAuthenticationCode(params: SmsAuthenticationRequestBaseDto) {
        let url = `${Config.apiServer}/api/v1/sms/auth`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    // 로그인하지 않아도 확인 가능
    async verifyAuthenticationCode(params: SmsAuthenticationVerifyDto) {
        let url = `${Config.apiServer}/api/v1/sms/auth/verify`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    // 로그인한 상태에서 확인
    async verifyAuthenticationCodeForLoginId(params: SmsAuthenticationVerifyDto) {
        let url = `${Config.apiServer}/api/v1/sms/auth/verify/id`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }
}