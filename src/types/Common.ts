export enum MyPageStatus {
    None = -1,
    ExpireFreePlan = 1,
    UnavailableCard,
    StoppedMembership,
    WithdrawalAccount
}

export type PagedRequestDto = {
    pageNumber?: number;
    pageSize?: number;
}

export type PaginationData = {
    currentPage: number,
    totalCount: number,
    totalPage: number,
}

export enum AuthMethodType {
    Phone,
    Email
}

export type FileDownloadDto = {
    fileApi: string,
    fileName: string
}


//////////////////////////////////////////////////////////////////
// Modal 관련

export enum ModalState {
    None,
    UserCount,
    SubscriptionExpiration,
    ShareSns,
    CreditCard,
    BusinessNo,
    ServiceTerms,
    PaymentTerms
}

export type ModalParam = {
    state: ModalState;
    param?: any;
}

// Modal 관련
//////////////////////////////////////////////////////////////////