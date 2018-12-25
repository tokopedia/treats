const fs = require("fs-extra"),
    path = require("path"),
    RESOLVER = require("./resolver"),
    ROOT_PATH = process.cwd(),
    configPath = path.resolve(ROOT_PATH, "./treats.config.js");

let userAlias = {};
if (fs.pathExistsSync(configPath)) {
    userAlias = require(configPath).alias;
}

const CORE_PATH = path.resolve(__dirname),
    CORE_SERVER_PATH = path.resolve(CORE_PATH, "./server"),
    CORE_CLIENT_PATH = path.resolve(CORE_PATH, "./client"),
    CORE_COMPONENT_PATH = path.resolve(CORE_PATH, "./shared/component"),
    CORE_UTIL_PATH = path.resolve(CORE_PATH, "./shared/util"),
    CORE_ROUTE_PATH = path.resolve(CORE_PATH, "./shared/router"),
    CORE_ALIAS_PATH = path.resolve(CORE_PATH, "./alias"),
    CORE_FLOW_TYPED_PATH = path.resolve(CORE_PATH, "./flow-typed"),
    CORE_REDUX_PROXY_PATH = path.resolve(CORE_PATH, "./shared/proxy/redux.js"),
    CORE_ROUTER_PROXY_PATH = path.resolve(CORE_PATH, "./shared/proxy/router.js"),
    resolvedAlias = Object.keys(RESOLVER).reduce((accumulator, key) => {
        const { custom, default: def } = RESOLVER[key];
        if (process.env.NODE_ENV !== "test") {
            accumulator[`@@${key}@@`] = fs.pathExistsSync(custom) ? custom : def;
        } else {
            accumulator[`@@${key}@@`] = def;
        }
        return accumulator;
    }, {});

const alias = {
    ...userAlias,
    "@ROOT_DIR@": ROOT_PATH,
    "@treats/server": CORE_SERVER_PATH,
    "@treats/client": CORE_CLIENT_PATH,
    "@treats/component": CORE_COMPONENT_PATH,
    "@treats/util": CORE_UTIL_PATH,
    "@treats/alias": CORE_ALIAS_PATH,
    "@treats/flow-typed": CORE_FLOW_TYPED_PATH,
    "@treats/locale-data": "react-intl/locale-data",
    "@treats/helmet": "react-helmet",
    "@treats/intl": "react-intl",
    "@treats/router": CORE_ROUTER_PROXY_PATH,
    "@treats/route": CORE_ROUTE_PATH,
    "@treats/graphql": "react-apollo",
    "@treats/redux": CORE_REDUX_PROXY_PATH,
    ...resolvedAlias
};

module.exports = alias;
