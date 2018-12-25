//@flow
import type { $Request, $Response, $NextFunction } from "express";
import type { MiddlewareInterfaceType } from "@treats/flow-typed/middleware";
import { SUPPORTED_LANG, DEFAULT_LANG } from "./const";
import eventType from "./event";

type LocaleMiddlewareType = {
    ...MiddlewareInterfaceType
};

const localeMiddleware: LocaleMiddlewareType = {
    middleware(req: $Request, res: $Response, next: $NextFunction) {
        if (!req.error) {
            const { app } = req,
                appConfig = app.get("config"),
                cookieOptions = appConfig.get("locale.cookie_opts"),
                defaultLang = appConfig.get("locale.default_lang") || DEFAULT_LANG,
                eventManager = app.get("eventManager"),
                { lang: cookieLang } = req.cookies,
                { lang: queryLang } = req.query;

            console.verbose(`[Locale Middleware] is running for ${req.url}`);
            let language = queryLang || cookieLang || defaultLang;
            language = SUPPORTED_LANG.indexOf(language) !== -1 ? language : defaultLang;
            if (
                !cookieLang ||
                (queryLang && cookieLang !== queryLang) ||
                SUPPORTED_LANG.indexOf(language) === -1
            ) {
                console.verbose(
                    `[Locale Middleware] locale cookie not found for ${
                        req.url
                    } set cookie to language ${language}`
                );
                res.cookie("lang", language, { maxAge: 86400000, ...cookieOptions });
                eventManager.fire(eventType.NO_LOCALE, req, res, language);
            }
            req.locale = {
                language
            };
            if (!req.appProps) {
                req.appProps = {};
            }
            req.appProps = {
                ...req.appProps,
                language
            };
            req.renderParams = {
                ...req.renderParams,
                language
            };
            console.verbose(`[Locale Middleware] has finished for ${req.url}`);
        }
        next();
    }
};

export default localeMiddleware;
