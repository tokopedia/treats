/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-helmet" />
/// <reference types="react-intl" />
/// <reference types="react-redux" />
/// <reference types="react-router" />
/// <reference types="react-router-dom" />
/// <reference types="redux" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "staging" | "production" | "test",
        PUBLIC_URL: string
    }
}

declare module "*.bmp" {
    const src: string;
    export default src;
}

declare module "*.gif" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.less" {
    const classes: { [key: string]: string };
    export default classes;
}

//Treats Core Declaration
declare module "@treats/intl" {
    import reactIntl = ReactIntl;
    export = reactIntl;
}

declare module "@treats/helmet" {
    import reactHelmet from "react-helmet";

    export default reactHelmet;
}

declare module "@treats/router" {
    export {
        BrowserRouter,
        HashRouter,
        NavLink,
        Prompt,
        MemoryRouter,
        Route,
        Router,
        StaticRouter,
        Switch,
        withRouter,
        matchPath
    } from "react-router-dom";
    export { default as Redirect } from "@treats/component/redirect";
    export { default as Link } from "@treats/component/link";    
}

declare module "@treats/route" {
    type ModuleType = { [key: string]: string }
    type RouteType = {
        name: string,
        path: string,
        exact?: boolean,
        disabled?: boolean
        component: ModuleType
    }

    const routes: Array<RouteType>
    export default routes
}

declare module "@treats/client" {
    const initClient: Function;
    export default initClient;
}

declare module "@treats/server" {
    const initServer: Function;
    export default initServer;
}

declare module "@treats/redux" {
    export * from "redux";
    export * from "react-redux";
}

//Treats Util Declaration
declare module "@treats/util/cookie" {
    export const getCookie: Function;
}

declare module "@treats/util/graphql" {
    export const mergeApolloConfig: Function;
    export const combineLinkStates: Function;
}

declare module "@treats/util/json" {
    export const injectParam: Function;
    export const bindParams: Function;
}

declare module "@treats/util/location" {
    export const findActiveRoute: Function;
    export const isPushEnabled: Function;
    export const getURLfromLocation: Function;
}

declare module "@treats/util/redux" {
    export const mergeReduxState: Function;
    export const typeGenerator: Function;
    export const reducerGenerator: Function;
    export const actionCreatorGenerator: Function;
}

declare module "@treats/util/security" {
    export const deserializeJSON: Function;
    export const serializeJSON: Function;
    export const escapeHtml: Function;
    export const escapeHtmlQueryObject: Function;
}

declare module "@treats/util/string" {
    export const camelToKebabCase: Function;
}

declare module "@treats/util/typecheck" {
    export const isArray: Function;
    export const isString: Function;
    export const isObject: Function;
    export const isNumber: Function;
    export const isFunction: Function;
}


//Treats Component declaration
declare module "@treats/component/async-component" {
    const component: Function;
    export default component;
}

declare module "@treats/component/async-loader" {
    const component: Function;
    export default component;
}

declare module "@treats/component/error-boundary" {
    import * as React from "react";

    export const withErrorBoundary: Function;
    const component: React.ReactNode;
    export default component;
}

declare module "@treats/component/http-status" {
    import * as React from "react";

    const component: React.ReactNode;
    export default component;
}

declare module "@treats/component/link" {
    import * as React from "react";

    const component: React.ReactNode;
    export default component;
}

declare module "@treats/component/provider" {
    import * as React from "react";

    const component: React.ReactNode;
    export default component;
}

declare module "@treats/component/redirect" {
    const component: Route;
    export default component;
}

// These modules is an alias from react-intl/locale-data
declare module "@treats/locale-data/af" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/agq" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ak" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/am" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ar" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/as" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/asa" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ast" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/az" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bas" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/be" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bem" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bez" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bm" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/br" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/brx" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/bs" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ca" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ce" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/cgg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/chr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ckb" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/cs" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/cu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/cy" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/da" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dav" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/de" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dje" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dsb" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dua" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dv" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dyo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/dz" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ebu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ee" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/el" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/en" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/eo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/es" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/et" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/eu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ewo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fa" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ff" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fi" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fil" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fur" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/fy" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ga" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/gd" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/gl" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/gsw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/gu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/guw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/guz" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/gv" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ha" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/haw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/he" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/hi" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/hr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/hsb" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/hu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/hy" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/id" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ig" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ii" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/in" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/is" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/it" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/iu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/iw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ja" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/jbo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/jgo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ji" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/jmc" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/jv" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/jw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ka" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kab" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kaj" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kam" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kcg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kde" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kea" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/khq" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ki" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kk" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kkj" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kl" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kln" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/km" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ko" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kok" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ks" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ksb" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ksf" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ksh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ku" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/kw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ky" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lag" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lb" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lkt" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ln" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lrc" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lt" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/luo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/luy" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/lv" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mas" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mer" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mfe" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mgh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mgo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mk" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ml" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ms" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mt" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mua" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/my" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/mzn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nah" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/naq" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nb" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nd" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ne" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nl" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nmg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nnh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/no" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nqo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nso" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nus" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ny" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/nyn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/om" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/or" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/os" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/pa" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/pap" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/pl" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/prg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ps" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/pt" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/qu" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/rm" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/rn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ro" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/rof" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ru" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/rw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/rwk" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sah" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/saq" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sbp" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sdh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/se" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/seh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ses" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sg" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/shi" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/si" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sk" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sl" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sma" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/smi" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/smj" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/smn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sms" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/so" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sq" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ss" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ssy" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/st" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sv" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/sw" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/syr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ta" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/te" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/teo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/th" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ti" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/tig" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/tk" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/tl" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/tn" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/to" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/tr" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ts" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/twq" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/tzm" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ug" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/uk" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ur" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/uz" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/vai" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/ve" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/vi" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/vo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/vun" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/wa" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/wae" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/wo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/xh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/xog" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/yav" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/yi" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/yo" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/zgh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/zh" {
    const data: ReactIntl.LocaleData;
    export = data;
}

declare module "@treats/locale-data/zu" {
    const data: ReactIntl.LocaleData;
    export = data;
}
