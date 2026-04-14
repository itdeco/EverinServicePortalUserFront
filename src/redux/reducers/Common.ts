import {CommonState, initialCommonState} from "@/redux/types/Store";
import {Action} from "@/redux/actions";
import {CommonActionType} from "@/redux/types/CommonAction";

export function commonReducer(state: CommonState = initialCommonState, action: Action) {
    switch (action.type) {
        case CommonActionType.SiteType:
            return {
                ...state,
                ...action.payload
            }
        case CommonActionType.TopNotice:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}