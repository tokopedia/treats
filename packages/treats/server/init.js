import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import routes from "@treats/route";
import { isArray, isFunction } from "@treats/util/typecheck";

import config from "./helper/config";
import logger from "./helper/logger";
import localeMiddleware from "./middleware/locale";
import assets from "./helper/assets";
import eventManager, { eventTypes } from "./helper/event";
import renderer from "./renderer";
import templates from "./template";

import { DEFAULT_ENV, ASSETS_PATH } from "./const";

/**
 * A function to create helper in Treats server.
 * @param app Treats server instance
 * @param customHelpers user-defined helpers
 */
const initHelper = (app, customHelpers) => {
    const envVars = app.get("envVars");
    config.init(app, envVars);
    assets.init(app);
    eventManager.init(app);
    if (customHelpers) {
        if (isArray(customHelpers)) {
            customHelpers.forEach(helper => {
                if (helper.init) {
                    helper.init(app, envVars);
                }
            });
        } else if (isFunction(customHelpers)) {
            customHelpers(app, envVars);
        } else {
            customHelpers.init(app, envVars);
        }
    }

    process.on("beforeExit", () => {
        if (customHelpers) {
            if (isArray(customHelpers)) {
                customHelpers.forEach(helper => {
                    if (helper.destroy) {
                        helper.destroy(app, envVars);
                    }
                });
            } else if (!isFunction(customHelpers)) {
                customHelpers.destroy(app, envVars);
            }
        }
    });

    process.on("unhandledRejection", err => {
        console.error(`UnhandledRejection: ${err.toString()}`);
        console.error(err);
    });
    console.verbose("[Helpers] Initialized");
};

/**
 * A function to create middleware in Treats server.
 * @param app Treats server instance
 * @param customMiddlewares user-defined middlewares
 */
const initMiddleware = (app, customMiddlewares) => {
    const envVars = app.get("envVars");

    if (process.env.NODE_ENV === "development") {
        const initWDSProxy = require("./wds-proxy").default;
        if (!global.__WDS_PROXY) {
            initWDSProxy();
        }
        app.use("/__TREATS_WDS__", global.__WDS_PROXY);
    }
    if (envVars.serveAssets) {
        console.info(
            `[Assets] Serving assets locally from ${ASSETS_PATH} on ${envVars.serveAssetsURL}`
        );
        app.use(envVars.serveAssetsURL, express.static(ASSETS_PATH));
    }
    /*External Middleware Initialization */
    /* Helmet - Secure HTTP Header*/
    app.use(
        helmet({
            xssFilter: false
        })
    );

    /* Cookie Parser - Parse Cookies from Client (available in req object) */
    app.use(cookieParser());

    /* Morgan - HTTP logger */
    if (process.env.NODE_ENV === "production") {
        app.use(
            morgan("dev", {
                stream: logger.stream
            })
        );
    } else {
        app.use(
            morgan("common", {
                stream: logger.stream
            })
        );
    }

    app.use(localeMiddleware.middleware);

    if (customMiddlewares) {
        if (isArray(customMiddlewares)) {
            customMiddlewares.forEach(middleware => {
                if (middleware.init) {
                    middleware.init(app, envVars);
                }
                app.use(middleware.middleware);
            });
        } else if (isFunction(customMiddlewares)) {
            customMiddlewares(app, envVars);
        } else {
            if (customMiddlewares.init) {
                customMiddlewares.init(app, envVars);
            }
            app.use(customMiddlewares.middleware);
        }
    }
    console.verbose("[Middlewares] Initialized");
};

/**
 * A function to create renderer in Treats server.
 * @param app Treats server instance
 * @param customRenderers user-defined renderers
 */
const initRenderer = (app, customRenderers) => {
    routes.forEach(routerData => {
        const {
                name: moduleName,
                path: routePath,
                template: routeTemplate = "default"
            } = routerData,
            evManager = app.get("eventManager");
        app.get(routePath, async (req, res) => {
            try {
                req.renderParams = {
                    ...req.renderParams,
                    route: moduleName,
                    template: routeTemplate
                };
                req.router = routerData;
                evManager.fire(eventTypes.BEFORE_RENDER, req, res);
                const routerContext = {},
                    html = await renderer(req, res, routerContext, customRenderers);

                evManager.fire(eventTypes.AFTER_RENDER, req, res);

                if (routerContext.url || routerContext.status) {
                    if (routerContext.url !== req.url) {
                        /* Redirection */
                        res.redirect(routerContext.status || 301, routerContext.url);
                        return;
                    }
                    /* Add HTTP Status */
                    res.status(routerContext.status).send(html);
                    return;
                }
                res.send(html);
                return;
            } catch (err) {
                evManager.fire(eventTypes.ERROR_RENDER, req, res);
                console.error(`[Renderer] Can't render markup for ${req.url}`);
                console.error(err);
                let html;
                if (templates._error) {
                    html = templates._error({ router: routerData, err }, req, res);
                } else {
                    html = err.toString();
                }
                res.status(500).send(html);
            }
        });
    });

    app.get("*", (req, res) => {
        console.warn(`Warning: Unhandled Route accessed at ${req.url}`);
        let html;
        if (templates._notfound) {
            html = templates._notfound(req.renderParams, req, res);
        } else {
            html = "404";
        }
        res.status(404).send(html);
    });
    console.verbose("[Renderer] Initialized");
};

/**
 * A function to create server for Treats.
 * @param params user-defined function to customise server behaviour
 */
const initServer = params => {
    let userENV, customMiddlewares, customHelpers, customEvents, customRenderers;
    if (params) {
        userENV = params.envVars;
        customMiddlewares = params.customMiddlewares;
        customHelpers = params.customHelpers;
        customEvents = params.customEvents;
        customRenderers = params.customRenderers;
    }
    const envVars = {
        ...DEFAULT_ENV,
        ...userENV
    };
    const app = express();
    logger.init(app, envVars);

    if (!userENV || !userENV.env) {
        console.info("[ENV] Environment Variable not set, used development as default");
    } else {
        console.info(`[ENV] Environment Variable set as ${userENV.env}`);
    }
    app.set("envVars", envVars);
    app.set("events", customEvents || {});
    initHelper(app, customHelpers);
    initMiddleware(app, customMiddlewares);
    initRenderer(app, customRenderers);
    console.info("[Server] Initialized");
    return app;
};

export default initServer;
