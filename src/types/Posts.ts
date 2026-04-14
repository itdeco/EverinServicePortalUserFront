import {PagedRequestDto, PaginationData} from "@/types/Common";

export enum PostType {
    Notice,
    Faq,
    Inquiry
}

export const PostTypeNames = [
    "공지사항",
    "자주 문는 질문",
    "1:1 문의"
]

export enum PostStatusType {
    Deleted,
    AdminDeleted,
    Published
}

export type PostDto = {
    id?: number;
    postNo?: number;
    parentId?: number;
    postCategoryId?: number;
    userId?: number;
    userName?: string;
    adminId?: number;
    adminUserName?: string;
    productId?: number;
    productName?: string;
    commonCodeId?: number;
    commonCodeName?: string;
    title?: string;
    content?: string;
    searchText?: string;
    type?: PostType;
    status?: PostStatusType;
    options?: number;
    viewCount?: number;
    registerDate?: Date;
    modifyDate?: Date;
    updateDate?: Date;
    attachments?: AttachmentDto[];
    children?: PostDto[];
}

export type CreatePostDto = PostDto & {
    inlineImageIds?: number[];
    attachments?: any;
}

export type PagedPostRequestDto = PagedRequestDto & {
    postType?: PostType;
    keyword?: string;
    searchOption?: number
}

export type PagedPostsDto = {
    posts: PostDto[];
    pagination: PaginationData;
}

export enum PostSearchKeywordType {
    None,
    Title,
    UserName,
    AdminName,
    SearchText,
    UserNameOrTitle,
    TitleOrSearchText,
    UserNameOrTitleOrSearchText
}

export type AttachmentDto = {
    id?: number,
    userId?: number,
    postId?: number,
    originalName?: string,
    size?: number,
    fileType?: number,      // 첨부파일 유형(0: 첨부파일, 1: 인라인 이미지, 3: 썸네일 이미지)
    savedName?: string,
    registeredDateTime?: string,
    updatedDateTime?: string
}

export type FaqCommonCodeDto = {
    commonCodeId?: number;
    commonCodeName?: string;
    posts?: PostDto[];
}

export enum FileType {
    Attachment,
    InlineImage,
    Thumbnail
}

export enum ThumbnailPostType {
    VideoGuide,
    EverStory
}

export enum ServiceType {
    EverTime,
    EverPayroll
}

export type ThumbnailPostDto = {
    id?: number;
    postNo?: number;
    parentId?: number;
    adminId?: number;
    adminUserName?: string;
    productId?: number;
    commonCodeId?: number;
    commonCodeName?: string;
    type?: number;
    serviceType?: number;
    title?: string;
    authorName?: string;
    url?: string;
    corporationName?: string;
    content?: string;
    searchText?: string;
    thumbnailFileId?: number;
    writeDate?: Date;
    registerDate?: Date;
    modifyDate?: Date;
    updateDate?: Date;
    thumbnail?: File;
    attachments?: AttachmentDto[];
}

export type PagedThumbnailPostDto = {
    posts: ThumbnailPostDto[];
    pagination: PaginationData;
}