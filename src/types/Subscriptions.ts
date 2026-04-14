import {CorporationDto} from "@/types/Users";

export enum SubscriptionType {
    Free,
    Monthly
}


export type SubscriptionItemDto = {
    id?: number;
    planProductId?: number;
    planProductName?: string;
    userCount?: number;
    price?: number;
    useVAT?: boolean;
    registerDate?: Date;
    updateDate?: Date;
}

export type SubscriptionDto = {
    id?: number;
    corporationId?: number;
    corporationName?: string;
    corporationType?: number;
    planId?: number;
    planName?: string;
    cardId?: number;
    cardCompany?: string;
    type?: SubscriptionType;
    userCount?: number;
    status?: number;
    firstUserCount?: number;
    price?: number;
    useVAT?: number;
    noUse?: number;
    subscribeDate?: Date;
    startDate?: Date;
    expireRequestDate?: Date;
    expireDate?: Date;
    updateDate?: Date;
    items?: SubscriptionItemDto[];
    payment?: PaymentAmountDto;
}

export type PaymentAmountDto = {
    amount?: number;
    totAmount?: number;
    vat?: number;
    memberBaseAmt?: number;
    memberChangeAmt?: number;
}

export type SubscriptionWithCorporationDto = {
    subscription: SubscriptionDto;
    corporation: CorporationDto;
    isTrialUpgrade?: boolean;
}

export enum SubscriptionStatusType {
    Available = 0,          // 정상
    PaymentError = 1,       // 결제오류 (사용이 중지된 것은 아니나 구독만료 대상)
    PaymentCancel= 2,       // 결제 후 승인취소 (사용이 중지된 것은 아니나 구독만료 대상)
    Pause = 3 ,             // 결제오류로 인한 사용중지
    Expire = 9              // 구독만료
}

export type SubscriptionAmountDto = {
    id?: number;
    userId?: number;
    subscriptionId?: number;
    amount?: number;
    prevAmount?: number;
    calculationDate?: Date;
}

export enum SubscriptionLogType {
    ChangeUsers,
    QuitSubscription
}

export type SubscriptionLogDto = {
    id?: number;
    userId?: number;
    subscriptionId?: number;
    adminId?: number;
    corpName?: string;
    type?: SubscriptionLogType;
    planName?: string;
    productName?: string;
    userCount?: number;
    newUserCount?: number;
    expireDate?: Date;
    updateDate?: Date;
}

export type SubscriptionMonthlyValueDto = {
    subscriptionId?: number;
    year?: number;
    month?: number;
    value?: number;
}

export type SubscriptionChartDataDto = {
    amounts?: SubscriptionMonthlyValueDto[];
    userCounts?: SubscriptionMonthlyValueDto[];
}