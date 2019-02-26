import "@babel/polyfill";
import "unfetch/polyfill";
import React from "react";
import { AppContainer } from "react-hot-loader";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import $ from "jquery";

import Provider from "@treats/component/provider";
import { isFunction } from "@treats/util/typecheck";
import { getCookie } from "@treats/util/cookie";
import App from "@@BUILD_REACT_APP_PATH@@";
import loadLocaleData from "./locale";

let customGraphQLConfig, configureStore, configureApolloClient;

if (process.env.TREATS_BUILD_ENV.redux !== false) {
    configureStore = require("../shared/redux").default;
}

if (process.env.TREATS_BUILD_ENV.graphql !== false) {
    customGraphQLConfig = require("../shared/graphql/config").default;
    configureApolloClient = require("../shared/graphql").default;
}

const initClient = params => {
    let reduxState, apolloState, lang, rootDiv, userProps;
    if (params) {
        reduxState = params.reduxState;
        apolloState = params.apolloState;
        lang = params.lang;
        rootDiv = params.rootDiv;
        userProps = params.appProps;
    }
    const guardedReduxState = reduxState || window.__data,
        guardedApolloState = apolloState || window.__apollo,
        langRegexResult = new RegExp("[?&]lang(=([^&#]*)|&|#|$)").exec(window.location.search),
        guardedLang =
            lang ||
            getCookie("lang") ||
            (langRegexResult && langRegexResult !== null && langRegexResult[2]) ||
            (navigator.languages && navigator.languages[0]) ||
            navigator.language ||
            navigator.userLanguage ||
            "en-US",
        guardedRootDiv = rootDiv || "treats-root";

    let reduxStore, apolloConfig, apolloClient;

    if (process.env.TREATS_BUILD_ENV.redux !== false) {
        reduxStore = configureStore(guardedReduxState);
    }

    if (process.env.TREATS_BUILD_ENV.graphql !== false) {
        apolloConfig = isFunction(customGraphQLConfig)
            ? customGraphQLConfig()
            : customGraphQLConfig;
        apolloClient = configureApolloClient(guardedApolloState, apolloConfig);
    }

    const language = guardedLang.split("-")[0].toLowerCase(),
        appProps = {
            ...userProps,
            reduxStore,
            apolloClient,
            language
        };

    if ($("#service-worker").length > 0 && "serviceWorker" in navigator) {
        const serviceWorkerPath = $("#service-worker").prop("src");
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register(serviceWorkerPath, { scope: "./" })
                .then(registration =>
                    //eslint-disable-next-line no-console
                    console.log(
                        `Service worker registration on ${serviceWorkerPath} is successfull`,
                        registration
                    ))
                .catch(error => console.error("Service worker registrations failed", error));
        });
    }

    loadLocaleData(language).then(messages =>
        hydrate(
            <AppContainer>
                <Provider {...appProps} intlProps={{ locale: language, messages }}>
                    <BrowserRouter>
                        <App {...appProps} messages={messages} />
                    </BrowserRouter>
                </Provider>
            </AppContainer>,
            typeof guardedRootDiv === "string"
                ? document.getElementById(guardedRootDiv)
                : guardedRootDiv
        ));

    if (process.env.NODE_ENV === "development" && module.hot) {
        module.hot.accept(["@@BUILD_REACT_APP_PATH@@", "./locale"], () => {
            loadLocaleData(language).then(messages =>
                render(
                    <AppContainer>
                        <Provider {...appProps} intlProps={{ locale: language, messages }}>
                            <BrowserRouter>
                                <App {...appProps} messages={messages} />
                            </BrowserRouter>
                        </Provider>
                    </AppContainer>,
                    typeof guardedRootDiv === "string"
                        ? document.getElementById(guardedRootDiv)
                        : guardedRootDiv
                ));
        });
    }
};

export default initClient;
