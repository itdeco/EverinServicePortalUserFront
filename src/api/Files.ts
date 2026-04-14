import Config from "@/utils/config";
import {PORTAL_TYPE, PORTAL_TYPE_HEADER_NAME, TOKEN_HEADER_NAME} from "@/utils/constant";
import TokenUtil from "@/utils/tokenUtil";
import {FileDownloadDto} from "@/types/Common";
import {alertMessage} from "@/utils/messageBox";

export default class ApiFiles {
    async downloadFile(params: FileDownloadDto) {
        try {
            fetch(params.fileApi, {
                headers: {
                    "Accept-Language": "UTF-8",
                    "Content-Type": "application/octet-stream",
                    [TOKEN_HEADER_NAME]: TokenUtil.getToken(),
                    [PORTAL_TYPE_HEADER_NAME]: PORTAL_TYPE
                }
            }).then(response => {
                if (response.headers.get("Content-Type") == "application/json") {
                    response.json().then(data => {
                            alertMessage(data.message).then();
                        });
                    throw new Error('File Download failed');
                }
                return response.blob()
            }).then((payload) => {
                let url = window.URL.createObjectURL(payload);
                let a = document.createElement('a');
                a.href = url;
                a.download = params.fileName!;
                a.click();
            }).catch(error => {});
        } catch (err) {
            alertMessage(err).then();
        }
    }

    private getAttachmentUrl = (postId: number, attachmentId: number) => {
        return `${Config.apiServer}/api/v1/files/post/${postId}/${attachmentId}`;
    }

    async downloadPostAttachment(postId: number, attachmentId: number, fileName: string) {
        let params: FileDownloadDto = {
            fileApi: this.getAttachmentUrl(postId, attachmentId),
            fileName: fileName
        };

        this.downloadFile(params).then();
    }

    public getThumbnailUrl = (thumbnailPostId: number, attachmentId: number) => {
        return `${Config.apiServer}/api/v1/files/thumbnail-posts/thumbnail/${thumbnailPostId}/${attachmentId}`;
    }

    async downloadThumbnailPostAttachment(thumbnailPostId: number, attachmentId: number, fileName: string) {
        let params: FileDownloadDto = {
            fileApi: this.getThumbnailUrl(thumbnailPostId, attachmentId),
            fileName: fileName
        };

        this.downloadFile(params).then();
    }

    public getPopupBannerUrl = (popupId: number, attachmentId: number) => {
        return `${Config.apiServer}/api/v1/files/popups/${popupId}/${attachmentId}`;
    }
}
