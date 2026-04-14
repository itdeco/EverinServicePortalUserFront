import {Method} from "@/api/ApiClient";
import {API_SUCCESS, API_UNKNOWN_ERROR} from "@/utils/exception";

// 공공데이터포털 서비스키
const serviceKey = "%2B0IFKMfl3aY3MdEBAp3PcHs1RyzK6crWVM4Lqrv3%2FCkGAKyx2rkitKUM9qxQGbOeHOzuBSW1P26AodUfjnWQkw%3D%3D";

const doPublicFetch = (url: string, body: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        $.ajax({
            url: url,
            type: Method.Post,
            data: JSON.stringify(body),
            contentType: "application/json",
            //async: false,
            success: function (data) {
                resolve({
                    code: API_SUCCESS,
                    payload: data.data[0]
                });
            },
            error: function (data) {
                resolve({
                    code: API_UNKNOWN_ERROR,
                    payload: data.responseJSON
                });
            }
        });
    });
}

export default class ApiPublic {
    async checkBusinessNo(businessNo: string | number | string[] | undefined) {
        const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;
        const body = {
            "b_no": [
                businessNo
            ]
        }

        return doPublicFetch(url, body);
    }
}