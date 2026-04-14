import {PaginationData} from "@/types/Common";

export type ProductServiceDto = {
    id?: number;
    productId?: number;
    code?: string;
    name?: string;
    description?: string;
    registerDate?: Date;
    updateDate?: Date;
}

export type ProductDto = {
    id?: number;
    categoryId?: number;
    name?: string;
    noUse?: number;
    visible?: number;
    description?: string;
    adminId?: number;
    adminUserName?: string;
    registerDate?: Date;
    updateDate?: Date;
    services?: ProductServiceDto[];
}

export type PagedProductDto = PaginationData & {
    list: ProductDto[];
}