import {combineReducers} from "redux";
import {
    userCardsReducer,
    userCorporationReducer, userPaymentStatusReducer,
    userProfileReducer,
    userSubscriptionReducer
} from "@/redux/reducers/Users";
import {planReducer} from "@/redux/reducers/Plans";
import {commonReducer} from "@/redux/reducers/Common";
import { persistReducer } from 'redux-persist';
import storage from '@/redux/storage'

const persistConfig = {
    key: "root", // localStorage key
    storage, // localStorage
    whitelist: [
        "userProfile",
        "corporationState",
        "cardState",
        "subscriptionState",
        "paymentStatusState",
        "planState",
        "commonState",
        "siteState"
    ], // target (reducer name)
}

const rootReducer = combineReducers({
    userProfile: userProfileReducer,
    corporationState: userCorporationReducer,
    cardState: userCardsReducer,
    subscriptionState: userSubscriptionReducer,
    paymentStatusState:userPaymentStatusReducer,
    planState: planReducer,
    commonState: commonReducer
});

//export default rootReducer;
export default persistReducer(persistConfig, rootReducer);