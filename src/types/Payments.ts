import {PaginationData} from "@/types/Common";

export enum PaymentStatusType {
    None,
    Success,
    Error
}

export enum PaymentMethodType {
    CreditCard,
    Banking
}

export enum PaymentLogStatusType {
    NotPaid,       // 미납
    Paid,          // 납부완료
    ManualPaid,    // 수동납부완료
    Refund,        // 환불
    Cancel,        // 취소
    Error = 8,     // 오류
    Pause          // 미결제로 인한 일시 중지
}

export type PaymentLogDto = {
    id?: number;
    userId?: number;
    subscriptionId?: number;
    planName?: string;
    status?: PaymentLogStatusType;
    userCount?: number;
    vat?: number;
    amount?: number;
    paymentMethod?: PaymentMethodType;
    cardCompany?: string;
    cardNo?: string;
    year?: number;
    month?: number;
    payDate?: Date;
    cancelDate?: Date;
    useStartDate?: Date;
    useEndDate?: Date;
}

export type PagedPaymentLogDto = PaginationData & {
    list: PaymentLogDto[];
}

export type PaymentStatusDto = {
    userId?: number;
    paymentLogId?: number;
    year?: number;
    month?: number;
    corporationName?: string;
    status?: number;
    errorMessage?: string;
    errorDate?: Date;
}
