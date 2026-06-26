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
    role?: string;
    authority?: string;
    memberRole?: string;
    isMaster?: boolean;
    master?: boolean;
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

// 회사 관리자 상태
export enum CompanyAdminStatus {
    Active = 0,     // 수락 완료(활성)
    Invited = 1,    // 초대 메일 발송됨(수락 대기)
}

// 회사별 관리자 (모든 관리자는 동일한 권한)
export type CompanyAdminDto = {
    adminId?: number;
    userId?: number;
    name?: string;
    email?: string;
    status?: CompanyAdminStatus;    // 활성 / 초대됨
    invitedDate?: string;
    joinedDate?: string;
}

// 관리자 초대 입력(개별)
export type CompanyAdminInviteeDto = {
    name: string;
    email: string;
}

// 관리자 초대 요청(회사별, N명)
export type CompanyAdminInviteDto = {
    corporationId: number;
    invitees: CompanyAdminInviteeDto[];
}

// 결제수단 종류 (0: 카드, 1: CMS/계좌이체)
export enum CompanyPaymentMethodType {
    Card = 0,
    Cms = 1,
}

// 회사별 결제수단 (카드 또는 CMS)
export type CompanyPaymentMethodDto = {
    methodId?: number;
    corporationId?: number;
    type?: CompanyPaymentMethodType;
    primary?: number;
    // 카드 결제
    cardCompany?: string;
    cardNumber?: string;
    expirationYear?: string;
    expirationMonth?: string;
    // CMS(계좌이체)
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
}

// 결제수단 등록 요청
export type CompanyPaymentMethodCreateDto = CompanyPaymentMethodDto & {
    corporationId: number;
    type: CompanyPaymentMethodType;
}

// 관리자 초대 토큰 조회 결과 (초대 메일의 링크로 진입 시)
export type CompanyAdminInvitationDto = {
    token?: string;
    corporationId?: number;
    corporationName?: string;
    inviterName?: string;        // 초대한 관리자 성함
    inviteeName?: string;        // 초대 대상 성함(초기값, 수정 가능)
    email?: string;              // 초대된 이메일(고정, 변경 불가)
    isExistingUser?: boolean;    // 이미 가입된 회원인지 여부
    expired?: boolean;           // 만료 여부
}

// 초대 수락(신규 가입)
export type CompanyAdminInviteSignUpDto = {
    token: string;
    email: string;
    name: string;
    password: string;
    phone: string;
}

// 초대 수락(기존 회원 로그인 → 회사 합류)
export type CompanyAdminInviteJoinDto = {
    token: string;
    loginId: string;
    password: string;
}

// 회사별 통합 관리 정보(회사 + 관리자 + 결제수단)
export type CompanyManagementDto = {
    corporationId?: number;
    name?: string;
    businessNo?: string;
    admins?: CompanyAdminDto[];
    paymentMethods?: CompanyPaymentMethodDto[];
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
