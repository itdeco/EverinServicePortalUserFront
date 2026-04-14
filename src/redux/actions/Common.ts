import {CommonActionType} from "@/redux/types/CommonAction";
import {SiteType} from "@/types/SiteType";
import {PostDto} from "@/types/Posts";

const setSite = (siteType: SiteType) => {
    return {
        type: CommonActionType.SiteType,
        payload: {
            siteType: siteType
        }
    }
}

const setTopNotice = (topNotice: PostDto) => {
    return {
        type: CommonActionType.TopNotice,
        payload: {
            topNotice: topNotice
        }
    }
}
export const CommonActions = {
    setSite: setSite,
    setTopNotice: setTopNotice
}