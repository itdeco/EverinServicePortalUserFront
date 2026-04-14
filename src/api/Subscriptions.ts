import Config from "@/utils/config";
import {callApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";
import {SubscriptionDto, SubscriptionWithCorporationDto} from "@/types/Subscriptions";

export default class ApiSubscriptions {
    async getMySubscriptions() {
        const url = `${Config.apiServer}/api/v1/subscriptions/`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async subscribe(params: SubscriptionDto) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${params.corporationId}`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async subscribeWithCorporation(params: SubscriptionWithCorporationDto) {
        const url = `${Config.apiServer}/api/v1/subscriptions/`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async upgradeTrialSubscription(params: SubscriptionWithCorporationDto, trialSubscriptionId: Number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${trialSubscriptionId}/trial`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async upgradeSubscription(params: SubscriptionDto) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${params.corporationId}`;

        return callApi({
            url: url,
            method: Method.Put,
            body: params
        });
    }

    async resumeSubscribing(subscriptionId: Number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/resume`;

        return callApi({
            url: url,
            method: Method.Put
        });
    }

    async setUserCount(subscriptionId: number, count: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/user-count?count=${count}`;

        return callApi({
            url: url,
            method: Method.Put
        });
    }

    async changeSubscriptionCreditCard(subscriptionId: number, creditCardId: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/card/${creditCardId}`;

        return callApi({
            url: url,
            method: Method.Put
        });
    }

    async setSubscriptionExpireDate(subscriptionId: number, quitDate: Date) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/expire`;

        return callApi({
            url: url,
            method: Method.Put,
            body: { value: quitDate.getTime() }
        });
    }

    async checkStoppedSubscription(corporationId: number, planId: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/corporation/${corporationId}/plan/${planId}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async hasSubscribedFreePlan(planId: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/free-plan/${planId}/check`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async recoverSubscription(subscriptionId: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/recover`;

        return callApi({
            url: url,
            method: Method.Put
        });
    }

    async expireSubscription(subscriptionId: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}`;

        return callApi({
            url: url,
            method: Method.Delete
        });
    }

    async getSubscriptionAmount(subscriptionId: number) {
        const url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/amount`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getUserChangeLogsForDate(subscriptionId: number, year: number | null, month: number | null) {
        let url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/logs/user`;
        if (year && month) {
            url += `?year=${year}&month=${month}`;
        }

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getRecentChartData(subscriptionId: number) {
        let url = `${Config.apiServer}/api/v1/subscriptions/${subscriptionId}/chart-data`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }
}