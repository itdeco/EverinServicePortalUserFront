"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CookiesProvider } from "react-cookie";

import configureStore from "@/redux/configureStore";

const store = configureStore();
const persistor = persistStore(store);

export default function StoreProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </CookiesProvider>
    );
}