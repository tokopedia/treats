/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-helmet" />
/// <reference types="react-intl" />
/// <reference types="react-redux" />
/// <reference types="redux" />
/// <reference path="./treats-component.d.ts" />
/// <reference path="./treats-util.d.ts" />

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

declare module "@treats/intl" {
    import reactIntl = ReactIntl;
    export = reactIntl;
}

declare module "@treats/helmet" {
    import reactHelmet from "react-helmet";

    export default reactHelmet;
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
    export const connect: Function;
    import * as Redux from "redux";

    export default Redux;
}
