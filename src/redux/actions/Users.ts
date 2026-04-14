import {UserActionType} from "@/redux/types/UserAction";
import {SubscriptionDto} from "@/types/Subscriptions";
import {CorporationDto, CreditCardDto} from "@/types/Users";
import {PaymentStatusDto} from "@/types/Payments";

const setUserProfile = (state: {}) => {
    return {
        type: UserActionType.UserProfile,
        payload: state
    }
}

const setCorporations = (corporations: CorporationDto[] | null) => {
    return {
        type: UserActionType.Corporations,
        payload: {
            corporations: corporations
        }
    }
}

const setCards = (cards: CreditCardDto[] | null) => {
    return {
        type: UserActionType.Cards,
        payload: {
            cards: cards
        }
    }
}

const setSubscriptions = (subscriptions: SubscriptionDto[] | null) => {
    return {
        type: UserActionType.Subscriptions,
        payload: {
            subscriptions: subscriptions
        }
    }
}

const setPaymentStatuses = (paymentStatuses: PaymentStatusDto[] | null) => {
    return {
        type: UserActionType.PaymentStatuses,
        payload: {
            paymentStatuses: paymentStatuses
        }
    }
}

export const UserActions = {
    setUserProfile: setUserProfile,
    setCorporations: setCorporations,
    setCards: setCards,
    setSubscriptions: setSubscriptions,
    setPaymentStatuses: setPaymentStatuses
}