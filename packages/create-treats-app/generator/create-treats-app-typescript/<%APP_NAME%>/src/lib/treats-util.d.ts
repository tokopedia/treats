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
