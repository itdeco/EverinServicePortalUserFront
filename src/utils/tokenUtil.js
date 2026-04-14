import CommonUtil from "./commonUtil";
import {TOKEN_EXPIRED, TOKEN_INVALID, TOKEN_VALID} from "@/utils/constant";

const { CookieUtil } = require("./cookieUtil");
const TOKEN_NAME = "ylwToken";

const TokenUtil = {
    setToken: (token) => {
        CookieUtil.removeCookie(TOKEN_NAME);
        if (token) {
            CookieUtil.createCookie(TOKEN_NAME, token)
        }
    },
    getToken: () => {
        let token = CookieUtil.readCookie(TOKEN_NAME);
        return token ? token : "";
    },
    validateToken: (token) => {
        let profile = CommonUtil.parseJwt(token);

        if (profile && profile.exp) {
            let chkTime = parseInt(String(CommonUtil.getTimeForCheckExpiration()));
            if (chkTime > profile.exp) {
                return {
                    success: false,
                    code: TOKEN_EXPIRED,
                    profile: null
                };
            }

            profile.token = token;

            return {
                success: true,
                code: TOKEN_VALID,
                profile: profile
            };
        } else {
            return {
                success: false,
                code: TOKEN_INVALID,
                profile: null
            };
        }
    }
}

export default TokenUtil;