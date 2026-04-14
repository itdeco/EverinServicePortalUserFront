import {UserProfileState} from "@/redux/types/Store";

export type LogInRequestDto = {
    loginId: string,
    password: string,
}

export type SignUpRequestDto = {
    email: string;
    name: string;
    password: string;
    phone: string;
    trialSubscriptionId?: number;
    trialUserCount?: number;
    agreeMarketingTerms?: boolean;
}

export type DelegationRequestDto = SignUpRequestDto & {
    fromUserId: number;
}

export type DelegationAcceptDto = {
    fromUserId: number;
    toUserId: number;
    delegationLogId: number;
}

export type DelegationLogDto = {
    id?: number;
    fromUserId?: number;
    fromUserLoginId?: string;
    fromUserName?: string;
    toUserId?: number;
    toUserLoginId?: string;
    toUserName?: string;
    askDate?: Date;
    acceptDate?: Date;
}

export type DelegationCompleteDto = {
    toUserId: number;
    delegationLogId: number;
    creditCardId: number;
}

export type DelegationCreditCardDto = CreditCardDto & {
    toUserId: number;
    delegationLogId: number;
}

export type DelegationUserSearchDto = {
    companySeq?: number;
    keyword?: string;
}

export type EverTimeUserDto = {
    userName?: string;
    email?: string;
}

export type UserPreferenceDto = {
    passwordChangeMonth?: number;
    paymentErrorAlertDays?: number;
    paymentErrorLockDays?: number;
    subscriptionExpireDays?: number;
}

export type UserDto = UserProfileState & {
    token?: string;
}

export type UserSimpleDto = {
    userId: number;
    loginId: string;
    name: string;
    phone?: string;
    options?: number;
    signUpDate?: Date;
    logInDate?: Date;
}

export enum UserStatusType {
    Normal = 0,                 // 일반
    DelegationRequest = 1,      // 권한위임 요청한 상태
    DelegationTarget = 2,       // 권한위임 요청을 받은 상태
    Delegated = 3,              // 권한위임
    Upgrading = 4,              // 체험판에서 업그레이드 중
    Dormant = 9,                // 휴면 상태
    Withdrawal = 10             // 탈퇴
}

export enum CorporationType {
    Normal,
    NonProfit
}

export type CorporationDto = {
    corporationId?: number;
    name?: string;
    type?: CorporationType;
    businessNo?: string;
}

export type CreditCardDto = {
    cardId?: number;
    userId?: number;
    companyName?: string;
    number?: string;
    expirationYear?: string;
    expirationMonth?: string;
    password?: string;
    identityNumber?: string;
    primary?: number;
}

export type UserCorporationCardDto = {
    userId?: number;
    corporations?: CorporationDto[];
    creditCards?: CreditCardDto[];
}

export type ChangePasswordDto = {
    password: string;
    newPassword: string;
}

export type ChangePhoneDto = {
    phone?: string;
    code?: string;
}

export type SmsAuthenticationRequestBaseDto = {
    userName?: string;
    needToCheckUserName?: boolean;
    phone: string;
}

export type SmsAuthenticationVerifyDto = SmsAuthenticationRequestBaseDto & {
    authenticationCode: string;
}

export type RedisAuthenticationDto = {
    authenticationCode: string;
    uniqueKey: string;
}

//0: 서비스품질불만, 1: 이용빈도 낮음, 2: 개인정보 유출 우려, 3: A/S 불만, 8: 기타 사유, 9: 고객명의업무방해(취소시 사용)

export enum WithdrawalReason {
    ServiceComplain = 0,
    LowUse = 1,
    Privacy = 2,
    ASComplain = 3,
    Etc = 8,
    Disturb = 9
}

export type WithdrawalLogDto = {
    id?: number;
    userId?: number;
    reason?: number;
    description?: string;
    cancel?: number;
    actionDate?: Date;
}