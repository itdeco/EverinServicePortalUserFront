import Config from "@/utils/config";
import {callApi, callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";
import {TrialRequestDto} from "@/types/Trials";

export default class ApiTrials {
    async requestTrial(params: TrialRequestDto) {
        const url = `${Config.apiServer}/api/v1/trials/`;

        return callPublicApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async requestTrialForPortalUser(params: TrialRequestDto) {
        const url = `${Config.apiServer}/api/v1/trials/user`;

        return callApi({
            url: url,
            method: Method.Post,
            body: params
        });
    }

    async getUserTrialInfo() {
        const url = `${Config.apiServer}/api/v1/trials/`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getTrialInfo(trialSubscriptionId: number) {
        const url = `${Config.apiServer}/api/v1/trials/${trialSubscriptionId}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getUpgradeTrialPlan(trialSubscriptionId: number) {
        const url = `${Config.apiServer}/api/v1/trials/${trialSubscriptionId}/plan`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async checkAvailableTrialSubscription(trialSubscriptionId: number, companySeq: number) {
        const url = `${Config.apiServer}/api/v1/trials/check/${trialSubscriptionId}/${companySeq}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async checkAndSetTrialUpgradeStatus(trialSubscriptionId: number, companySeq: number) {
        const url = `${Config.apiServer}/api/v1/trials/upgrade/${trialSubscriptionId}/${companySeq}`;

        return callPublicApi({
            url: url,
            method: Method.Post
        });
    }

    async setTrialUpgradeStatus() {
        const url = `${Config.apiServer}/api/v1/trials/user/upgrade-status`;

        return callApi({
            url: url,
            method: Method.Post
        });
    }

    async getEmployeeCount(trialSubscriptionId: number, companySeq: number) {
        const url = `${Config.apiServer}/api/v1/trials/${trialSubscriptionId}/${companySeq}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }
}
