// import { compose, legacy_createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import { rootReducer } from "./root-reducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// // import thunk from "redux-thunk";
// import createSagaMiddleware from "@redux-saga/core";
// import { rootSaga } from "./root-saga";

// /////////////////////////////////////////////////////
//                FOR TOOLKIT ///////////////////////////
//////////////////////////////
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "@redux-saga/core";

// how to create your own logger
/*
const myOwnLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};




const sagaMiddleWare = createSagaMiddleware();

/*
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter(Boolean);
*/
const sagaMiddleWare = createSagaMiddleware();
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter(Boolean);

/*
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
 */

/* 
export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
*/
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddeware) =>
    getDefaultMiddeware({
      serializableCheck: false,
    }).concat(middleWares),
});

/* 
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
*/
