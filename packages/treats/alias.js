const fs = require("fs-extra"),
    path = require("path"),
    RESOLVER = require("./resolver"),
    ROOT_PATH = process.cwd(),
    configPath = path.resolve(ROOT_PATH, "./treats.config.js"),
    configPathTypescript = path.resolve(ROOT_PATH, "./treats.config.ts"),
    useTypescript = fs.pathExistsSync(ROOT_PATH, "./tsconfig.json");

let userAlias = {};

//Capturing all user-defined alias in Treats config
if (fs.pathExistsSync(configPath)) {
    //Capturing user alias from treats.config.js
    userAlias = require(configPath).alias;
} else if (fs.pathExistsSync(configPathTypescript)) {
    //Use treats.config.ts if present
    userAlias = require(configPathTypescript).alias;
}

/**
 * A method to select path matching with the current configuration
 */
const selectPath = (useTypescript, currentResolver) => {
    const { custom, customTypescript, default: def } = currentResolver;
    //If tsconfig.json and typescript filesystem hooks found
    if (useTypescript && fs.pathExistsSync(customTypescript)) {
        return customTypescript;
    }

    //If no tsconfig.json nor typescript filesystem hooks found
    if (fs.pathExistsSync(custom)) {
        return custom;
    }

    //If no filsystem hooks found, return default path
    return def;
}

//Core paths
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
    //Filesystem hooks scan
    resolvedAlias = Object.keys(RESOLVER).reduce((accumulator, key) => {
        if (process.env.NODE_ENV !== "test") {
            accumulator[`@@${key}@@`] = selectPath(useTypescript, RESOLVER[key]);
        } else {
            accumulator[`@@${key}@@`] = def;
        }
        return accumulator;
    }, {});

//Overwrite userAlias with Core and Resolved Alias
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
