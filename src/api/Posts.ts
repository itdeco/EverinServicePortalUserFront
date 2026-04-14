import Config from "@/utils/config";
import {callApi, callNonJsonApi, callPublicApi} from "@/utils/apiUtil";
import {Method} from "@/api/ApiClient";
import {CreatePostDto, PagedPostRequestDto, ThumbnailPostDto} from "@/types/Posts";

export default class ApiPosts {
    async getPost(postId: number) {
        let url = `${Config.apiServer}/api/v1/posts/${postId}`;

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getPagedPosts(params: PagedPostRequestDto) {
        let url = `${Config.apiServer}/api/v1/posts/list?postType=${params.postType}&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;

        if (params.keyword && 0 < params.keyword.length) {
            url += `&keyword=${params.keyword}&searchOption=${params.searchOption}`;
        }

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async getPagedNoticePosts(params: PagedPostRequestDto) {
        let url = `${Config.apiServer}/api/v1/posts/notice?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;

        if (params.keyword && 0 < params.keyword.length) {
            url += `&keyword=${params.keyword}&searchOption=${params.searchOption}`;
        }

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getTopNotice() {
        let url = `${Config.apiServer}/api/v1/posts/notice/latest/top`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getFaqPosts(faqCommonCode: string) {
        const url = `${Config.apiServer}/api/v1/posts/faq?faqCommonCode=${faqCommonCode}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getFaqBestPosts() {
        const url = `${Config.apiServer}/api/v1/posts/faq/best`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getPagedInquiryPosts(params: PagedPostRequestDto) {
        let url = `${Config.apiServer}/api/v1/posts/inquiry?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;

        if (params.keyword && 0 < params.keyword.length) {
            url += `&keyword=${params.keyword}&searchOption=${params.searchOption}`;
        }

        return callApi({
            url: url,
            method: Method.Get
        });
    }

    async increasePostViewCount(postId: number) {
        const url = `${Config.apiServer}/api/v1/posts/${postId}/view`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async createPost(post: CreatePostDto) {
        const url = `${Config.apiServer}/api/v1/posts/`;

        let formData = new FormData();
        if (post.attachments && post.attachments.length > 0) {
            post.attachments.forEach((file: File | Blob) => {
                formData.append("files", file);
            });
        }

        delete post.attachments;

        formData.append("post", new Blob([JSON.stringify(post, (key, value) =>
            typeof value === 'number' ? value.toString() : value
        )], {
            type: "application/json"
        }));

        return callNonJsonApi({
            url: url,
            method: Method.Post,
            body: formData,
        });
    }

    async createThumbnailPost(thumbnailPost: ThumbnailPostDto) {
        const url = `${Config.apiServer}/api/v1/thumb-posts/`;

        let formData = new FormData();
        if (thumbnailPost.thumbnail) {
            formData.append("thumbnail", thumbnailPost.thumbnail);
        }

        delete thumbnailPost.thumbnail;

        formData.append("thumbnailPost", new Blob([JSON.stringify(thumbnailPost, (key, value) =>
            typeof value === 'number' ? value.toString() : value
        )], {
            type: "application/json"
        }));

        return callNonJsonApi({
            url: url,
            method: Method.Post,
            body: formData,
        });
    }

    async increaseThumbnailPostViewCount(thumbnailPostId: number) {
        const url = `${Config.apiServer}/api/v1/thumb-posts/${thumbnailPostId}/view`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getVideoGuides() {
        const url = `${Config.apiServer}/api/v1/thumb-posts/video-guides`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async searchVideoGuides(keyword: string) {
        const url = `${Config.apiServer}/api/v1/thumb-posts/video-guides/search?keyword=${keyword}`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }

    async getEverStories() {
        const url = `${Config.apiServer}/api/v1/thumb-posts/everstories`;

        return callPublicApi({
            url: url,
            method: Method.Get
        });
    }
}
