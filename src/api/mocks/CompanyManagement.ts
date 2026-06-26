import { API_SUCCESS } from "@/utils/exception";
import {
    CompanyAdminStatus,
    CompanyManagementDto,
} from "@/types/Users";

// 서버 미구현 시 화면 확인용 목업 데이터.
// 실제 API가 준비되면 ApiUsers 의 폴백 분기가 호출되지 않습니다.
export function getMockCompanyManagement(): CompanyManagementDto[] {
    return [
        {
            corporationId: 1,
            name: "참존(주)",
            businessNo: "212-12-12222",
            isMaster: true,
            admins: [
                {
                    adminId: 101,
                    userId: 5001,
                    name: "홍길동",
                    email: "test@test.com",
                    isMaster: true,
                    status: CompanyAdminStatus.Active,
                    joinedDate: "2026-01-01",
                },
                {
                    adminId: 102,
                    userId: 5002,
                    name: "김철수",
                    email: "chulsoo@test.com",
                    isMaster: false,
                    status: CompanyAdminStatus.Active,
                    joinedDate: "2026-01-05",
                },
                {
                    adminId: 103,
                    name: "이영희",
                    email: "younghee@test.com",
                    isMaster: false,
                    status: CompanyAdminStatus.Invited,
                    invitedDate: "2026-02-10",
                },
            ],
            creditCards: [
                {
                    cardId: 201,
                    companyName: "신한카드",
                    number: "5570-****-****-1234",
                    primary: 1,
                },
                {
                    cardId: 202,
                    companyName: "국민카드",
                    number: "4012-****-****-5678",
                    primary: 0,
                },
            ],
        },
        {
            corporationId: 2,
            name: "에버인테스트 법인",
            businessNo: "212-12-33333",
            isMaster: false,
            admins: [
                {
                    adminId: 111,
                    userId: 5001,
                    name: "홍길동",
                    email: "test@test.com",
                    isMaster: false,
                    status: CompanyAdminStatus.Active,
                    joinedDate: "2026-06-01",
                },
            ],
            creditCards: [],
        },
    ];
}

// 실제 API 결과가 비정상일 때 목업으로 대체
export function withCompanyMgmtMock(result: any) {
    if (result && typeof result.code === "number" && result.code <= API_SUCCESS && result.payload) {
        return result;
    }

    return {
        code: API_SUCCESS,
        payload: getMockCompanyManagement(),
    };
}
