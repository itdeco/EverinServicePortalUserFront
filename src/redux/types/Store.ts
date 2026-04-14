import {PlanDetailDto} from "@/types/Plans";
import {CorporationDto, CreditCardDto, UserPreferenceDto} from "@/types/Users";
import {SubscriptionDto} from "@/types/Subscriptions";
import {SiteType} from "@/types/SiteType";
import {PostDto} from "@/types/Posts";
import {PaymentStatusDto} from "@/types/Payments";

export type GlobalState = {
    userProfile: UserProfileState;
    corporationState: CorporationState;
    cardState: CreditCardState;
    subscriptionState: SubscriptionState;
    paymentStatusState: PaymentStatusState;
    planState: PlanState;
    commonState: CommonState;
}

export type UserProfileState = {
    userId: number;
    loginId: string;
    name: string;
    phone?: string;
    grade?: number;
    status?: number;
    emailConsent?: number;
    termsConsent?: number;
    options?: number;
    signUpDate?: Date;
    dormantDate?: Date;
    logInDate?: Date;
    passwordDate?: Date;
    preference?: UserPreferenceDto;
    usedTrial?: boolean;
    regPortalType?:number;
}

export const initialUserProfileState: UserProfileState = {
    userId: 0,
    loginId: "",
    name: "",
    phone: "",
    grade: 0,
    status: 0,
    emailConsent: 0,
    termsConsent: 0,
    options: 0
}

export const initialCorporationState: CorporationState = {
    corporations: []
}

export type CorporationState = {
    corporations: CorporationDto[];
}

export type CreditCardState = {
    cards: CreditCardDto[];
}

export const initialCreditCardState: CreditCardState = {
    cards: []
}

export type SubscriptionState = {
    subscriptions: SubscriptionDto[];
}

export const initialSubscriptionState: SubscriptionState = {
    subscriptions: []
}

export type PaymentStatusState = {
    paymentStatuses: PaymentStatusDto[];
}

export const initialPaymentStatusState: PaymentStatusState = {
    paymentStatuses: []
}

export type PlanState = {
    plans: PlanDetailDto[]
}

export const initialPlanState: PlanState = {
    plans: []
}

export type CommonState = {
    siteType: SiteType;
    topNotice: PostDto | null;
}

export const initialCommonState: CommonState = {
    siteType: SiteType.EverTime,
    topNotice: null
}