import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { isArray } from "@treats/util/typecheck";

import rootReducer from "@@BUILD_REDUX_REDUCER_PATH@@";
import middleware from "@@BUILD_REDUX_MIDDLEWARE_PATH@@";

const configureStore = (initialState = {}) => {
    let guardedMiddleware = middleware;
    if (!isArray(guardedMiddleware)) {
        guardedMiddleware = [guardedMiddleware];
    }
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...guardedMiddleware))
    );

    if (process.env.NODE_ENV === "development" && module.hot) {
        /* Enable Webpack hot module replacement for reducers */
        module.hot.accept("@@BUILD_REDUX_REDUCER_PATH@@", () => {
            const nextRootReducer = require("@@BUILD_REDUX_REDUCER_PATH@@").default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;
