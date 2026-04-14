import {callApi, callPublicApi, callRedirectApi} from "@/utils/apiUtil";
import Config from "@/utils/config";
import {
    ChangePasswordDto,
    ChangePhoneDto,
    CreditCardDto, DelegationAcceptDto, DelegationCompleteDto, DelegationCreditCardDto,
    DelegationRequestDto,
    LogInRequestDto, RedisAuthenticationDto,
    SignUpRequestDto, WithdrawalLogDto
} from "@/types/Users";
import {Method} from "@/api/ApiClient";

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
