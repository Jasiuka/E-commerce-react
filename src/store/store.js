import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleWare = createSagaMiddleware();
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter(Boolean);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddeware) =>
    getDefaultMiddeware({
      serializableCheck: false,
    }).concat(middleWares),
});

export const persistor = persistStore(store);
