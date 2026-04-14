import {initialPlanState, PlanState} from "@/redux/types/Store";
import {Action} from "@/redux/actions";
import {PlanActionType} from "@/redux/types/PlanAction";

export function planReducer(state: PlanState = initialPlanState, action: Action) {
    switch (action.type) {
        case PlanActionType.Plans:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}