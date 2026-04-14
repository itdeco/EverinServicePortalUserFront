export type PopupDto = {
    id?: number;
    title?: string;
    description?: string;
    noUse?: boolean;        // 미사용여부(사용안함: true, 사용: false")
    startDate?: Date;
    endDate?: Date;
    linkType?: number;      // 링크유형 - 0: 없음, 1: 새창
    linkUrl?: string;
    options?: number;       // 옵션 - 0: 오늘 안봄, 1: 3일 안봄, 2: 7일 안봄
    width?: number;
    height?: number;
    isCenter?: number;
    x?: number;
    y?: number;
    registerDate?: Date;
    updateDate?: Date;
    bannerImageId?: number;
    check?: boolean;
}