import ApiUsers from "@/api/Users";
import ApiPlans from "@/api/Plans";
import ApiPublic from "@/api/Public";
import ApiPayments from "@/api/Payments";
import ApiCommon from "@/api/Common";
import ApiCommonCodes from "@/api/CommonCode";
import ApiPosts from "@/api/Posts";
import ApiFile from "@/api/Files";
import ApiFiles from "@/api/Files";
import ApiProducts from "@/api/Products";
import ApiSubscriptions from "@/api/Subscriptions";
import ApiSms from "@/api/Sms";
import ApiPopups from "@/api/Popup";
import ApiTerms from "@/api/Terms";
import ApiTrials from "@/api/Trials";

export enum Method {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}

export default class ApiClient {
    private _users: ApiUsers | undefined;
    private _plans: ApiPlans | undefined;
    private _public: ApiPublic | undefined;
    private _subscription: ApiSubscriptions | undefined;
    private _payments: ApiPayments | undefined;
    private _common: ApiCommon | undefined;
    private _commonCodes: ApiCommonCodes | undefined;
    private _posts: ApiPosts | undefined;
    private _files: ApiFiles | undefined;
    private _products: ApiProducts | undefined;
    private _sms: ApiSms | undefined;
    private _popups: ApiPopups | undefined;
    private _terms: ApiTerms | undefined;
    private _trials: ApiTrials | undefined;

    public constructor() {

    }

    get Users(): ApiUsers {
        if (!this._users) {
            this._users = new ApiUsers();
        }

        return this._users;
    }

    get Plans(): ApiPlans {
        if (!this._plans) {
            this._plans = new ApiPlans();
        }

        return this._plans;
    }

    get Subscriptions(): ApiSubscriptions {
        if (!this._subscription) {
            this._subscription = new ApiSubscriptions();
        }

        return this._subscription;
    }

    get Public(): ApiPublic {
        if (!this._public) {
            this._public = new ApiPublic();
        }

        return this._public;
    }

    get Payments(): ApiPayments {
        if (!this._payments) {
            this._payments = new ApiPayments();
        }

        return this._payments;
    }

    get Common(): ApiCommon {
        if (!this._common) {
            this._common = new ApiCommon();
        }

        return this._common;
    }

    get CommonCodes(): ApiCommonCodes {
        if (!this._commonCodes) {
            this._commonCodes = new ApiCommonCodes();
        }

        return this._commonCodes;
    }

    get Posts(): ApiPosts {
        if (!this._posts) {
            this._posts = new ApiPosts();
        }

        return this._posts;
    }

    get Files(): ApiFiles {
        if (!this._files) {
            this._files = new ApiFiles()
        }

        return this._files;
    }

    get Products(): ApiProducts {
        if (!this._products) {
            this._products = new ApiProducts();
        }

        return this._products;
    }

    get Sms(): ApiSms {
        if (!this._sms) {
            this._sms = new ApiSms();
        }

        return this._sms;
    }

    get Popups(): ApiPopups {
        if (!this._popups) {
            this._popups = new ApiPopups();
        }

        return this._popups;
    }

    get Terms(): ApiTerms {
        if (!this._terms) {
            this._terms = new ApiTerms();
        }

        return this._terms;
    }

    get Trials(): ApiTrials {
        if (!this._trials) {
            this._trials = new ApiTrials();
        }

        return this._trials;
    }
}