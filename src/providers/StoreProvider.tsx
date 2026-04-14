"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "@/redux/configureStore";
import { persistStore } from "redux-persist";

const store = configureStore();
const persistor = persistStore(store);

export default function StoreProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}