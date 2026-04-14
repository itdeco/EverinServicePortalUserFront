import {applyMiddleware, legacy_createStore as createStore, Store} from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "@/redux/reducers";

export default function configureStore(): Store {
    let middleware = applyMiddleware(thunk);
    return createStore(
        rootReducer,
        middleware,
    );
}