import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/types/Store";
import TokenUtil from "@/utils/tokenUtil";

export function useLoginStatus() {
    return useSelector((state: GlobalState) => {
        const value = TokenUtil.getToken() && state && state.userProfile && state.userProfile.loginId && 0 < state.userProfile.loginId.length;
        if ("" === value) {
            return false;
        }

        return value;
    });
}

export function useUserProfile() {
    return useSelector((state: GlobalState) => state ? state.userProfile : null);
}


export function useUserCorporations() {
    return useSelector((state: GlobalState) => state ? state.corporationState.corporations : null);
}

export function useUserCorporation(corporationId: number) {
    const corporations = useSelector((state: GlobalState) => state ? state.corporationState.corporations : null);
    return corporations ? corporations!.find(c => c.corporationId === corporationId) : null;
}

export function useUserCards() {
    return useSelector((state: GlobalState) => state && state.cardState ? state.cardState.cards : null);
}

export function useUserCard(cardId: number) {
    const cardState = useSelector((state: GlobalState) => state ? state.cardState : null);
    return cardState && cardState.cards ? cardState.cards.find(c => c.cardId === cardId) : null;
}

export function useUserSubscriptions() {
    return useSelector((state: GlobalState) => state ? state.subscriptionState.subscriptions : null);
}

export function useUserSubscription(subscriptionId: number) {
    const subscriptionState = useSelector((state: GlobalState) => state ? state.subscriptionState : null);
    return subscriptionState && subscriptionState.subscriptions ? subscriptionState?.subscriptions.find(s => s.id === subscriptionId) : null;
}

export function useUserPaymentStatuses() {
    return useSelector((state: GlobalState) => state ? state.paymentStatusState.paymentStatuses : null);
}