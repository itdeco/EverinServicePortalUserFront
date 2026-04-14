import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/types/Store";

export function useTopNotice() {
    return useSelector((state: GlobalState) => {
        return state ? state.commonState.topNotice : null;
    });
}