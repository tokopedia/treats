const path = require("path"),
    ROOT_PATH = process.cwd();

const RESOLVER = {
    BUILD_SERVER_APP_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_server"),
        default: path.resolve(__dirname, "./default/_server")
    },
    BUILD_CLIENT_APP_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_client"),
        default: path.resolve(__dirname, "./default/_client")
    },
    BUILD_ROUTE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_route/route.js"),
        default: path.resolve(__dirname, "./default/_route/route.js")
    },
    BUILD_ROUTE_MODULE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_route/module.js"),
        default: path.resolve(__dirname, "./default/_route/module.js")
    },
    BUILD_SERVER_TEMPLATE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_server/template.js"),
        default: path.resolve(__dirname, "./default/_server/template.js")
    },
    BUILD_REDUX_MIDDLEWARE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_redux/middleware.js"),
        default: path.resolve(__dirname, "./default/_redux/middleware.js")
    },
    BUILD_REDUX_REDUCER_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_redux/reducer.js"),
        default: path.resolve(__dirname, "./default/_redux/reducer.js")
    },
    BUILD_GRAPHQL_LINK_STATE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_graphql/link-state.js"),
        default: path.resolve(__dirname, "./default/_graphql/link-state.js")
    },
    BUILD_GRAPHQL_URI_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_graphql/uri.js"),
        default: path.resolve(__dirname, "./default/_graphql/uri.js")
    },
    BUILD_GRAPHQL_CLIENT_CONFIG_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_graphql/config.js"),
        default: path.resolve(__dirname, "./default/_graphql/config.js")
    },
    BUILD_REACT_APP_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_app/index.js"),
        default: path.resolve(__dirname, "./default/_app/index.js")
    },
    BUILD_GLOBAL_CSS_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_app/app.css"),
        default: path.resolve(__dirname, "./default/_app/app.css")
    },
    BUILD_LOCALE_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_locale"),
        default: path.resolve(__dirname, "./default/_locale")
    },
    BUILD_LOCALE_DATA_RESOLVER_PATH: {
        custom: path.resolve(ROOT_PATH, "./src/_locale/resolver.js"),
        default: path.resolve(__dirname, "./default/_locale/resolver.js")
    }
};

module.exports = RESOLVER;
