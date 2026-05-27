export type Category = {
    categoryId: string;
    categoryName: string;
    sortOrder?: number;
    services: Service[];
};

export type Service = Priceable & {
    serviceId: string;
    serviceName: string;
    description?: string;
    price?: number;
    defaultUsercount?: number;
    quoteOnly?: boolean;
    sortOrder?: number;
    isGroupService?: boolean;
    isExistPlan?: boolean;
    serviceItemSeq?: number;
    policySeq?: number;
    currSeq?: number;
    plans?: Plan[];
    subServices?: SubService[];
};

export type Plan = Priceable & {
    planId: string;
    planName: string;
    price: number;
    defaultUsercount?: number;
    quoteOnly?: boolean;
    sortOrder?: number;
    isGroupService?: boolean;
    serviceItemSeq?: number;
    policySeq?: number;
    currSeq?: number;
    allowedChildren?: string[];
};

export type SubService = Priceable & {
    serviceId: string;
    serviceName: string;
    description?: string;
    price: number;
    defaultUsercount?: number;
    quoteOnly?: boolean;
    sortOrder?: number;
    upperServiceSeq?: number;
    planSeq?: number;
    isSubService?: boolean;
    serviceItemSeq?: number;
    subServiceItemSeq?: number;
    policySeq?: number;
    currSeq?: number;
};

// OLD
export enum PlanType {
    Normal,
    Each,
    Combine
}

export enum PlanPriceType {
    //과금유형 - 0: 무료, 1: 유료, 2: 별도문의
    Free,
    Paid,
    Negotiate
}

export type PlanProductDto = {
    id?: number;
    planId?: number;
    productId?: number;
    productName?: string;
    productServiceId?: number;
    productServiceName?: string;
    description?: string;
    registerDate?: Date;
    updateDate?: Date;
}

export type PlanDto = {
    id?: number;
    name?: string;
    upgradePlanId?: number;     // 무료플랜인 경우 플랜 업그레이드 대상이 되는 플랜 ID
    type?: PlanType; // "플랜종류 - 0: 일반플랜, 1: 개별플랜, 2: 결합플랜"
    priceType?: PlanPriceType;
    price?: number;
    useVAT: boolean;
    freeMonths?: number;
    maxUsers?: number;
    minUsers?: number;
    noUse?: boolean; // 미사용여부(사용안함: true, 사용: false")
    description?: string;
    registerDate?: Date;
    updateDate?: Date;
}

export type PlanDetailDto = PlanDto & {
    planProducts?: PlanProductDto[];
}

export type PriceRule = {
    modelSeq: number;
    serviceItemSeq: number;
    serviceItemName: string;
    subServiceItemSeq: number;
    subServiceItemName: string;
    smPriceType: number;
    smPriceTypeName: string;
    appYm: string;
    seq: number;
    perFr: number;
    perTo: number;
    currPrice: number;
    basicPrice: number;
};

export type Priceable = {
    priceRules?: PriceRule[];
    smPriceType?: number;
    smPriceTypeName?: string;
    appYm?: string;
    priceSeq?: number;
};

