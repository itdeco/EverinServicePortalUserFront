import {PlanState} from "@/redux/types/Store";
import {PlanActionType} from "@/redux/types/PlanAction";
import {PlanDetailDto} from "@/types/subscribe";

const setPlans = (plans: PlanDetailDto[] | null) => {
    return {
        type: PlanActionType.Plans,
        payload: {
            plans: plans
        }
    }
}

export const PlanActions = {
    setPlans: setPlans
}