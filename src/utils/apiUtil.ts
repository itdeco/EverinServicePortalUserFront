import {API_SUCCESS, API_UNKNOWN_ERROR, getRequestErrorMessage, getServerErrorMessage} from "@/utils/exception";
import TokenUtil from "@/utils/tokenUtil";
import {alertMessage} from "@/utils/messageBox";
import {PORTAL_TYPE, PORTAL_TYPE_HEADER_NAME, TOKEN_HEADER_NAME} from "@/utils/constant";

// 0.5초 동안 API가 응답하지 않으면 로딩 인디케이터 표시
const API_LOADING_TIME = 500;
let setLoading: any;
let loadingRefCount = 0;

// noProcessData 추가: formData 인 경우 body 및 ContentType 헤더 관련
export type ApiParams = {
    url: string;
    headers?: object;
    method: string;
    body?: object;
}

export type ApiResult = {
    code: number;
    payload: object;
}

export function setLoadingFunction(func: any) {
    if (func) {
        setLoading = func;
    }
}

export function wait(loading: boolean) {
    if (setLoading) {
        let showIndicator: boolean = true;
        if (loading) {
            loadingRefCount++;
        } else {
            loadingRefCount--;
            if (0 >= loadingRefCount) {
                showIndicator = false;
            }
        }

        setLoading(showIndicator);
    }
}

function setLoadingTimeout() {
    return setTimeout(() => wait(true), API_LOADING_TIME);
}

function makeRequestHeaders(headers: object) {
    return {
        "Accept": "*/*",
        "Accept-Language": "ko-KR",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json;charset=UTF-8",
        ...headers
    };
}

function prepareApiParams(method: string, headers: object, body?: object, isNonJsonBody?: boolean): object {
    if (isNonJsonBody) {
        return {
            method: method,
            headers: headers,
            body: body,
        };
    }

    return {
        method: method,
        headers: makeRequestHeaders(headers),
        body: JSON.stringify(body),
    };
}

function isRequestError(errorCode: number) {
    return 400 <= errorCode && API_SUCCESS > errorCode;
}

function isServerError(errorCode: number) {
    return API_SUCCESS < errorCode;
}


// isPublicApi : 로그인하지 않고 호출 가능한 API, 토큰을 전달할 필요 없음
async function doFetch(params: ApiParams, isNonJsonBody: boolean, isPublicApi?: boolean, redirectUrl?: string) {
    const token = TokenUtil.getToken();

    if (!isPublicApi) {
        if (!token || 0 === token.length) {
            if (!location.href.includes("/login")) {
                location.href = redirectUrl ? "/login?url=" + redirectUrl : "/login";
                return;
            }
        }
    }

    let timerId: any;

    try {
        timerId = setLoadingTimeout();

        const requestHeaders = !isPublicApi && token ? {[TOKEN_HEADER_NAME]: token, [PORTAL_TYPE_HEADER_NAME]: PORTAL_TYPE, ...params.headers} : {[PORTAL_TYPE_HEADER_NAME]: PORTAL_TYPE, ...params.headers};
        const response = await fetch(params.url, prepareApiParams(params.method, requestHeaders, params.body, isNonJsonBody));

        if (response && isRequestError(response.status)) {
            // 토큰 만료 시에 발생
            if (500 === response.status) {
                TokenUtil.setToken(null);
                location.href = redirectUrl ? "/login?url=" + redirectUrl : "/login";
                return;
            }

            return {
                code: response.status,
                payload: null
            }
        } else {
            const data = await response.json();
            if (API_UNKNOWN_ERROR === data.code) {
                return {
                    code: data.code,
                    payload: data.message + "<p></p><p style='text-align: left'>" + data.contents + "</p>"
                }
            }

            return {
                code: data.code,
                payload: data.code <= API_SUCCESS ? data.contents : data.message
            }
        }
    } catch (error: any) {
        stopWaiting(timerId);
        await alertMessage(error);
    } finally {
        stopWaiting(timerId);
    }
}

function stopWaiting(timerId: any) {
    clearTimeout(timerId);
    wait(false);
}


export async function callPublicApi(params: ApiParams) {
    return doFetch(params, false, true);
}

export async function callApi(params: ApiParams) {
    return doFetch(params, false);
}

// Content-Type 및 application/json 이 들어가지 않고 json 문자열로 변환하지 않고 API 호출
export async function callNonJsonApi(params: ApiParams) {
    return doFetch(params, true);
}

export async function callRedirectApi(params: ApiParams, redirectUrl?: string) {
    return doFetch(params, false, false, redirectUrl);
}

// result: ApiResult
export function checkApiResult(result: any) {
    if (!result) {
        return false;
    }

    if (isRequestError(result.code)) {
        const errorMessage = getRequestErrorMessage(result.code);
        alertMessage(errorMessage).then();
        return false;
    }

    let success: boolean = true;
    if (isServerError(result.code)) {
        const errorMessage = result.payload || getServerErrorMessage(result.code);
        alertMessage(errorMessage).then();
        success = false;
    }

    return success;
}

export function getApiErrorMessage(result: any) {
    if (!result) {
        return false;
    }

    if (isRequestError(result.code)) {
        return getRequestErrorMessage(result.code);
    }

    if (isServerError(result.code)) {
        return result.payload || getServerErrorMessage(result.code);
    }

    return null;
}