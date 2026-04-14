export enum TermsType {
    Service,                // 서비스이용 동의
    Private,                // 개인정보수집 동의
    Marketing,              // 광고성정보수신 동의
    Payment,                // 정기과금 동의
    Contract                // 서비스이용계약 동의
}

export const TermsTitle = [
    "서비스이용약관",
    "개인정보처리방침",
    "광고성정보수신동의",
    "정기과금이용약관",
    "서비스이용계약서동의"
];

export type TermsHistoryDto = {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    description?: string;
}

export type TermsDto = {
    id?: number;
    type?: number;  // 약관유형 - 0: 서비스이용 동의, 1: 개인정보수집 동의, 2: 광고성정보수신 동의, 3: 정기과금 동의, 4: 서비스이용계약 동의
    noUse?: number;
    startDate?: Date;
    endDate?: Date;
    executionDate?: Date;
    adminId?: number;
    adminName?: string;
    content?: string;
    description?: string;
    registerDate?: Date;
    updateDate?: Date;
    history?: TermsHistoryDto[]
    check?: boolean;
}