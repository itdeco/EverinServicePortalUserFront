import {callApi, callPublicApi, callRedirectApi} from "@/utils/apiUtil";
import Config from "@/utils/config";
import {
    ChangePasswordDto,
    ChangePhoneDto,
    CompanyAdminInviteDto,
    CompanyAdminInviteJoinDto,
    CompanyAdminInviteSignUpDto,
    CompanyPaymentMethodCreateDto,
    CreditCardDto, DelegationAcceptDto, DelegationCompleteDto, DelegationCreditCardDto,
    DelegationRequestDto,
    LogInRequestDto, RedisAuthenticationDto,
    SignUpRequestDto, WithdrawalLogDto
} from "@/types/Users";
import {Method} from "@/api/ApiClient";
import {withCompanyMgmtMock, withInvitationMock} from "@/api/mocks/CompanyManagement";

export default class ApiUsers {
    async signUp(params: SignUpRequestDto) {
        const url = `${Config.apiServer}/api/v1/users/signup`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async withdrawal(params: WithdrawalLogDto) {
        const url = `${Config.apiServer}/api/v1/users/withdrawal`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async logIn(params: LogInRequestDto) {
        const url = `${Config.apiServer}/api/v1/users/login`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async confirm(params: LogInRequestDto) {
        const url = `${Config.apiServer}/api/v1/users/confirm`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async requestDelegation(delegateUserEmail: string) {
        const url = `${Config.apiServer}/api/v1/users/delegate/request`;

        return callApi({
            url: url,
            method: Method.Post,
            body: {
                value: delegateUserEmail
            }
        });
    }

    async cancelDelegationRequest() {
        const url = `${Config.apiServer}/api/v1/users/delegate/request/cancel`;

        return callApi({
            url: url,
            method: Method.Delete
        });
    }

    async acceptDelegation(params: DelegationRequestDto) {
        const url = `${Config.apiServer}/api/v1/users/delegate/accept`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async acceptDelegationForExisingUser(params: DelegationAcceptDto) {
        const url = `${Config.apiServer}/api/v1/users/delegate/accept/${params.toUserId}`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async completeDelegation(params: DelegationCompleteDto) {
        const url = `${Config.apiServer}/api/v1/users/delegate/complete`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async addCreditCardForDelegation(params: DelegationCreditCardDto) {
        const url = `${Config.apiServer}/api/v1/users/delegate/cards`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async getDelegationLog(delegationLogId: number) {
        const url = `${Config.apiServer}/api/v1/users/delegate/log/${delegationLogId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getUserDelegationLogs() {
        const url = `${Config.apiServer}/api/v1/users/delegate/logs`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getDelegationLogId(userId: number) {
        const url = `${Config.apiServer}/api/v1/users/delegate/log?userId=${userId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getCreditCardsForDelegation(userId: number, delegationLogId: number) {
        const url = `${Config.apiServer}/api/v1/users/delegate/cards/${userId}/${delegationLogId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getUserProfile(userId: number) {
        const url = `${Config.apiServer}/api/v1/users/${userId}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getSimpleUserProfileByEmailAndName(email: string, userName: string) {
        const url = `${Config.apiServer}/api/v1/users/find/simple?email=${email}&name=${userName}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async searchUsers(keyword: string) {
        const url = `${Config.apiServer}/api/v1/users/search?keyword=${keyword}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async requestSignUpAuthenticationMail(loginId: string) {
        const url = `${Config.apiServer}/api/v1/users/auth/signup/${loginId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async verifySignUpAuthenticationCode(params: RedisAuthenticationDto) {
        const url = `${Config.apiServer}/api/v1/users/auth/signup/verify`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async requestPasswordAuthenticationMail(loginId: string) {
        const url = `${Config.apiServer}/api/v1/users/auth/mail/${loginId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async verifyPasswordAuthenticationCode(params: RedisAuthenticationDto) {
        const url = `${Config.apiServer}/api/v1/users/auth/mail/verify`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async changePassword(params: ChangePasswordDto) {
        const url = `${Config.apiServer}/api/v1/users/password`;

        return callApi({
            url: url,
            method: Method.Put,
            body: params
        });
    }

    async changePasswordByToken(userId: number, token: string, password: string) {
        const url = `${Config.apiServer}/api/v1/users/password/change/${userId}/${token}`;

        return callPublicApi({
            url: url,
            method: Method.Put,
            body: {
                value: password
            }
        });
    }

    async changePhone(params: ChangePhoneDto) {
        const url = `${Config.apiServer}/api/v1/users/phone`;

        return callApi({
            url: url,
            method: Method.Put,
            body: params
        });
    }

    async getMyCorporationsAndCards() {
        const url = `${Config.apiServer}/api/v1/users/corporations-cards/`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getMyCorporations() {
        const url = `${Config.apiServer}/api/v1/users/corporations/`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    // [통합] 내 회사 목록 + 회사별 관리자 + 회사별 결제수단을 한 번에 조회
    // 서버 미구현 시 목업 데이터로 폴백
    async getMyCompanyManagement() {
        const url = `${Config.apiServer}/api/v1/users/companies/management`;

        const result = await callApi({
            url: url,
            method: Method.Get
        });

        return withCompanyMgmtMock(result);
    }

    // 회사별 관리자 조회
    async getCompanyAdmins(corporationId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}/admins`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    // 회사별 관리자 초대 (이메일/성함 N건, 메일 발송)
    async inviteCompanyAdmins(params: CompanyAdminInviteDto) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${params.corporationId}/admins/invite`;

        return callApi({
            url: url,
            method: Method.Post,
            body: { invitees: params.invitees }
        });
    }

    // 회사별 관리자 삭제
    async deleteCompanyAdmin(corporationId: number, adminId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}/admins/${adminId}`;

        return callApi({
            url: url,
            method: Method.Delete
        });
    }

    // 회사별 결제수단 조회 (카드 + CMS)
    async getCompanyPaymentMethods(corporationId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}/payment-methods`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    // 회사별 결제수단 등록 (카드 또는 CMS)
    async addCompanyPaymentMethod(params: CompanyPaymentMethodCreateDto) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${params.corporationId}/payment-methods`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    // 회사별 결제수단 삭제
    async deleteCompanyPaymentMethod(corporationId: number, methodId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}/payment-methods/${methodId}`;

        return callApi({
            url: url,
            method: Method.Delete
        });
    }

    // 회사별 기본 결제수단 변경 (선택한 수단을 기본으로, 나머지는 예비)
    async setPrimaryCompanyPaymentMethod(corporationId: number, methodId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}/payment-methods/${methodId}/primary`;

        return callApi({
            url: url,
            method: Method.Put
        });
    }

    // [초대] 토큰으로 초대 정보 조회 (메일 링크 진입 시) - 비로그인 호출
    async getAdminInvitation(token: string) {
        const url = `${Config.apiServer}/api/v1/users/invitations/${token}`;

        const result = await callPublicApi({
            url: url,
            method: Method.Get
        });

        return withInvitationMock(result, token);
    }

    // [초대] 신규 회원가입으로 초대 수락 - 비로그인 호출
    async acceptInvitationSignUp(params: CompanyAdminInviteSignUpDto) {
        const url = `${Config.apiServer}/api/v1/users/invitations/${params.token}/signup`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    // [초대] 기존 회원 로그인으로 초대 수락(회사 합류) - 비로그인 호출
    async acceptInvitationJoin(params: CompanyAdminInviteJoinDto) {
        const url = `${Config.apiServer}/api/v1/users/invitations/${params.token}/join`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async getCorporationByBusinessNo(businessNo: string) {
        const url = `${Config.apiServer}/api/v1/users/corporation?businessNo=${businessNo}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async addUserCorporation(corporationId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}`;

        return callApi({
            url: url,
            method: Method.Post
        });
    }

    async deleteCorporation(corporationId: number) {
        const url = `${Config.apiServer}/api/v1/users/corporation/${corporationId}`;

        return callApi({
            url: url,
            method: Method.Delete
        });
    }

    async getMyCreditCards(redirectUrl?: string) {
        const url = `${Config.apiServer}/api/v1/users/cards/`;

        return callRedirectApi({
            url: url,
            method: Method.Get
        }, redirectUrl);
    }

    async addCreditCard(params: CreditCardDto) {
        const url = `${Config.apiServer}/api/v1/users/cards/`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async updateCreditCard(params: CreditCardDto) {
        const url = `${Config.apiServer}/api/v1/users/cards/${params.cardId}`;

        return callApi({
            url: url,
            method: Method.Put,
            body: params
        });
    }

    async deleteCreditCard(cardId: number) {
        const url = `${Config.apiServer}/api/v1/users/cards/${cardId}`;

        return callApi({
            url: url,
            method: Method.Delete
        });
    }

    async wakeupDormant() {
        const url = `${Config.apiServer}/api/v1/users/wakeup`;

        return callApi({
            url: url,
            method: Method.Put
        });
    }

    async unsubscribeEmail(userId: number, token: string) {
        const url = `${Config.apiServer}/api/v1/users/unsubscribe/${userId}/${token}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async visit() {
        const url = `${Config.apiServer}/api/v1/users/visit`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async increaseQuotationDownloads() {
        const url = `${Config.apiServer}/api/v1/users/increase/quotation`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async searchDelegationUsers(keyword: string) {
        const url = `${Config.apiServer}/api/v1/users/ever-time?keyword=${keyword}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async searchDelegationUsersEx(companySeq: number, keyword: string) {
        const url = `${Config.apiServer}/api/v1/users/ever-time/search?companySeq=${companySeq}&keyword=${keyword}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }
}
