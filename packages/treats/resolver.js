const path = require("path"),
    ROOT_PATH = process.cwd();

/** 
 * Treats filesystem hooks with 3 config [custom, customTypescript, default].
 * custom or customTypescript will be used when you define them on your projects
 */
const RESOLVER = {
    BUILD_SERVER_APP_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_server"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_server"),
        default: path.resolve(__dirname, "./default/_server")
    },
    BUILD_CLIENT_APP_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_client"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_client"),
        default: path.resolve(__dirname, "./default/_client")
    },
    BUILD_ROUTE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_route/route.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_route/route.ts"),
        default: path.resolve(__dirname, "./default/_route/route.js")
    },
    BUILD_ROUTE_MODULE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_route/module.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_route/module.ts"),
        default: path.resolve(__dirname, "./default/_route/module.js")
    },
    BUILD_SERVER_TEMPLATE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_server/template.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_server/template.ts"),
        default: path.resolve(__dirname, "./default/_server/template.js")
    },
    BUILD_REDUX_MIDDLEWARE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_redux/middleware.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_redux/middleware.ts"),
        default: path.resolve(__dirname, "./default/_redux/middleware.js")
    },
    BUILD_REDUX_REDUCER_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_redux/reducer.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_redux/reducer.ts"),
        default: path.resolve(__dirname, "./default/_redux/reducer.js")
    },
    BUILD_GRAPHQL_LINK_STATE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_graphql/link-state.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_graphql/link-state.ts"),
        default: path.resolve(__dirname, "./default/_graphql/link-state.js")
    },
    BUILD_GRAPHQL_URI_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_graphql/uri.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_graphql/uri.ts"),
        default: path.resolve(__dirname, "./default/_graphql/uri.js")
    },
    BUILD_GRAPHQL_CLIENT_CONFIG_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_graphql/config.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_graphql/config.ts"),
        default: path.resolve(__dirname, "./default/_graphql/config.js")
    },
    BUILD_REACT_APP_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_app/index.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_app/index.ts"),
        default: path.resolve(__dirname, "./default/_app/index.js")
    },
    BUILD_GLOBAL_CSS_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_app/app.css"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_app/app.css"),
        default: path.resolve(__dirname, "./default/_app/app.css")
    },
    BUILD_LOCALE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_locale"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_locale"),
        default: path.resolve(__dirname, "./default/_locale")
    },
    BUILD_LOCALE_DATA_RESOLVER_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_locale/resolver.js"),
        customTypescript: path.resolve(ROOT_PATH, "./src/_locale/resolver.ts"),
        default: path.resolve(__dirname, "./default/_locale/resolver.js")
    }
};

module.exports = RESOLVER;
