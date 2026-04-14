import {CorporationType} from "@/types/Users";

export type TrialDto = {
    trialSubscriptionId?: number;
    trialUserId?: number;
    trialUserName?: string;
    email?: string;
    phone?: string;
    corporationName?: string;
    corporationType?: number;
    businessNo?: string;
    companySeq?: number;
    status?: number;
    userCount?: number;     // 체험신청한 사용자 수(재직자)
    startDate?: Date;
    expireDate?: Date;
    upgradeStatus?: number;
}

export type TrialUserDto = {
    id?: number;
    email?: string;
    name?: string;
    phone?: string;
    companySeq?: number;
    corporationName?: string;
    termsConsent?: number;
    registerDate?: Date;
}

export type TrialSubscriptionDto = {
    id?: number;
    trialUserId?: number;
    planId?: number;
    status?: number;
    startDate?: Date;
    expireDate?: Date;
    subscribeDate?: Date;
    firstExpireDate?: Date;
    updateDate?: Date;
}

export type TrialRequestDto = {
    trialUserName?: string;
    corporationType?: CorporationType;
    corporationName?: string;
    businessNo?: string;
    phone?: string;
    termsConsent?: number;
    planId?: number;
    corporationId?: number | null;
}

export enum TrialStatusType {
    Available = 0,
    SignedUp = 1,
    Expired = 2,
    UpgradeComplete = 3,
    Unavailable = 9
}
