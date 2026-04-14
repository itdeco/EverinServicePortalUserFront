export const CommonCode = {
    Faq: {
        type: "faq.type"
    },
    Inquiry:  {
        type: "inquiry.type"
    },
    EverStory: {
        type: "everstory.type"
    }
}

export type CommonCodeDto = {
    id?: number;
    categoryId?: number;
    name?: string;
    noUse?: number;
    description?: string;
    registerDate?: Date;
    updateDate?: Date;
}