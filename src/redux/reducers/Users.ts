import {
    CorporationState,
    CreditCardState, initialCorporationState,
    initialCreditCardState, initialPaymentStatusState, initialSubscriptionState,
    initialUserProfileState, PaymentStatusState,
    SubscriptionState,
    UserProfileState
} from "@/redux/types/Store";
import {UserActionType} from "@/redux/types/UserAction";
import {Action} from "@/redux/actions";

export function userProfileReducer(state: UserProfileState = initialUserProfileState, action: Action) {
    switch (action.type) {
        case UserActionType.UserProfile:
            return {
                ...state,
                ...(action.payload || {})
            }
        default:
            return state;
    }
}

export function userCorporationReducer(state: CorporationState = initialCorporationState, action: Action) {
    switch (action.type) {
        case UserActionType.Corporations:
            return {
                ...state,
                ...(action.payload || {})
            }
        default:
            return state;
    }
}

export function userCardsReducer(state: CreditCardState = initialCreditCardState, action: Action) {
    switch (action.type) {
        case UserActionType.Cards:
            return {
                ...state,
                ...(action.payload || {})
            }
        default:
            return state;
    }
}

export function userSubscriptionReducer(state: SubscriptionState = initialSubscriptionState, action: Action) {
    switch (action.type) {
        case UserActionType.Subscriptions:
            return {
                ...state,
                ...(action.payload || {})
            }
        default:
            return state;
    }
}

export function userPaymentStatusReducer(state: PaymentStatusState = initialPaymentStatusState, action: Action) {
    switch (action.type) {
        case UserActionType.PaymentStatuses:
            return {
                ...state,
                ...(action.payload || {})
            }
        default:
            return state;
    }
}