import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/types/Store";

export function usePlans()  {
    return useSelector((state: GlobalState) => {return state ? state.planState.plans : null});
}

export function usePlan(planId: number) {
    const planState = useSelector((state: GlobalState) => { return state ? state.planState : null});
    return !planState?.plans ? null : planState?.plans.find(p => p.id === planId);
}