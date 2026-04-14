export const API_SUCCESS = 1000;
export const API_UNKNOWN_ERROR = 2000;

type Error = {
    code: number,
    desc?: string,
    key?: string
}

const RequestErrors: Error[] = [
    { code: 400, desc: "Bad Request." },
    { code: 401, desc: "Unauthorized." },
    { code: 403, desc: "Forbidden." },
    { code: 404, desc: "Not Found." },
    { code: 405, desc: "Method Not Allowed." },
    { code: 406, desc: "No Acceptable." },
    { code: 408, desc: "Request Timeout." },
    { code: 409, desc: "Conflict." },
    { code: 411, desc: "Length Required." },
    { code: 412, desc: "Precondition Failed." },
    { code: 413, desc: "Payload Too Large." },
    { code: 414, desc: "Request-URI too long." },
    { code: 415, desc: "Unsupported media type." },
    { code: 429, desc: "Too many Requests." },
    { code: 500, desc: "Internal Server Error." },
    { code: 501, desc: "Not Implemented." },
    { code: 502, desc: "Bad Gateway." },
    { code: 503, desc: "Service Unavailable." },
    { code: 504, desc: "Gateway Timeout." },
    { code: 505, desc: "HTTP Version Not Supported." },
];

export const ServerErrors: Error[] = [
    { code: 2000, desc: "알 수 없는 오류가 발생했습니다." },
    { code: 3000, desc: "사용자를 찾을 수 없습니다." },
    { code: 3001, desc: "비밀번호가 일치하지 않습니다." },
];

function errorMessage(error: Error) {
    return "[오류코드: " + error.code + "]<br>" + error.desc;
}

export function getRequestErrorMessage(statusCode: number) {
    const requestError =  RequestErrors.find((error: Error) => {
        return statusCode === error.code;
    });

    return requestError ? errorMessage(requestError) : null;
}

export function getServerErrorMessage(responseCode: number) {
    const serverError =  ServerErrors.find((error: Error) => {
        return responseCode === error.code;
    });

    return serverError ? errorMessage(serverError) : null;
}