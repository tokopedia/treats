import React from "react";
import fetch from "node-fetch";
import { StaticRouter } from "react-router";
import { flushChunkNames, clearChunks } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { renderToString } from "react-dom/server";
import { Helmet } from "@treats/helmet";

import { serializeJSON } from "@treats/util/security";
import { isFunction, isArray } from "@treats/util/typecheck";

import Provider from "@treats/component/provider";
import locale from "@@BUILD_LOCALE_PATH@@";
import App from "@@BUILD_REACT_APP_PATH@@";
import templates from "./template";

let withReduxStore,
    withApolloClient,
    configureStore,
    configureApolloClient,
    getDataFromTree,
    mergeApolloConfig,
    customGraphQLClientConfig;

if (process.env.TREATS_BUILD_ENV.redux !== false) {
    configureStore = require("../shared/redux").default;
    withReduxStore = (req, res) => configureStore(req.reduxState);
}

if (process.env.TREATS_BUILD_ENV.graphql !== false) {
    configureApolloClient = require("../shared/graphql").default;
    getDataFromTree = require("react-apollo").getDataFromTree;
    mergeApolloConfig = require("@treats/util/graphql").mergeApolloConfig;
    customGraphQLClientConfig = require("../shared/graphql/config").default;

    withApolloClient = (req, res) => {
        const { apolloHeader: reqApolloHeader } = req;

        let defaultGraphQLConfig = {
            ssrMode: true,
            linkConfig: {
                fetch,
                headers: {
                    Cookie: req.header("Cookie"),
                    ...reqApolloHeader
                }
            }
        };

        if (customGraphQLClientConfig) {
            if (isFunction(customGraphQLClientConfig)) {
                defaultGraphQLConfig = customGraphQLClientConfig(defaultGraphQLConfig, req, res);
            } else {
                defaultGraphQLConfig = mergeApolloConfig(
                    defaultGraphQLConfig,
                    customGraphQLClientConfig
                );
            }
        }
        return configureApolloClient(req.apolloState, defaultGraphQLConfig);
    };
}

/**
 * A function to render react component. Use custom renderers if user provide it
 * @param reactApp React App will be rendered
 * @param customRenderers Function(s) to render another component beside the React App (e.g emotion)
 */
const renderReactMarkup = (reactApp, customRenderers) => {
    let result;
    if (customRenderers) {
        if (isFunction(customRenderers)) {
            result = customRenderers(reactApp, renderToString);
        } else if (isArray(customRenderers)) {
            result = renderToString(reactApp);
            for (let i = 0; i < customRenderers.length; i++) {
                if (customRenderers[i] && isFunction(customRenderers[i])) {
                    result = customRenderers[i](result);
                }
            }
        }
    } else {
        result = renderToString(reactApp);
    }
    return result;
};

/**
 * Renderer main function
 * @param req req object
 * @param res res object
 * @param routerContext context that will be injected into static router
 * @param customRenderers Function(s) to render another component beside React App (e.g emotion)
 */
const renderer = async (req, res, routerContext, customRenderers) => {
    const {
            appProps,
            app,
            router,
            locale: { language }
        } = req,
        assets = app.get("assets"),
        assetsStats = assets.get();

    console.verbose("[Renderer] Rendering React Markup");
    let reduxStore, apolloClient;

    if (process.env.TREATS_BUILD_ENV.redux !== false) {
        reduxStore = withReduxStore(req, res);
    }

    if (process.env.TREATS_BUILD_ENV.graphql !== false) {
        apolloClient = withApolloClient(req, res);
    }

    const promises = [];
    let initiatorComponent,
        { component } = router;

    //do SSR from component getInitialState()
    if (component) {
        if (component.preload) {
            component = await component.preload();
        }
        if (component.getInitialState) {
            initiatorComponent = component;
        } else if (component.WrappedComponent && component.WrappedComponent.getInitialState) {
            initiatorComponent = component.WrappedComponent;
        }
        if (initiatorComponent) {
            const serverContext = {
                req,
                res,
                reduxStore,
                apolloClient
            };
            promises.push(
                Promise.resolve(
                    initiatorComponent.getInitialState({
                        router,
                        serverContext
                    })
                )
            );
        }
    } else {
        console.error("[Renderer] Route Object didn't have valid component!");
    }

    await Promise.all(promises);

    const reactApp = (
        <Provider
            reduxStore={reduxStore}
            apolloClient={apolloClient}
            language={language}
            intlProps={{ locale: language, messages: locale[language] }}
        >
            <StaticRouter location={req.url} context={routerContext}>
                <App {...appProps} isSSR />
            </StaticRouter>
        </Provider>
    );

    if (process.env.TREATS_BUILD_ENV.graphql !== false) {
        await getDataFromTree(reactApp);
    }

    //Configure code-splitting and render the React Markup
    clearChunks();
    const reactMarkup = renderReactMarkup(reactApp, customRenderers),
        chunkNames = flushChunkNames(),
        { template } = req.renderParams,
        flushedChunks = flushChunks(assetsStats, {
            chunkNames,
            before: ["manifest", "vendor"],
            after: ["main"]
        }),
        { styles, js, cssHash: css } = flushedChunks;
    const jsTags = js.toString(),
        cssTags = styles.toString(),
        cssHash = css.toString(),
        helmetData = Helmet.renderStatic(),
        reduxState =
            process.env.TREATS_BUILD_ENV.redux !== false ? reduxStore.getState() : undefined,
        apolloState =
            process.env.TREATS_BUILD_ENV.graphql !== false ? apolloClient.extract() : undefined;

    console.verbose("[Renderer] Render React Markup Done");
    return templates[template](
        {
            ...req.renderParams,
            helmet: helmetData,
            reactMarkup,
            jsTags,
            cssTags,
            cssHash,
            reduxState: reduxState && serializeJSON(reduxState),
            apolloState: apolloState && serializeJSON(apolloState)
        },
        req,
        res
    );
};

export default renderer;
