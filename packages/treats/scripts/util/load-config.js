const reRequire = require("./re-require"),
    ROOT_PATH = process.cwd(),
    fs = require("fs-extra"),
    path = require("path");

const loadTreatsConfig = options => {
    const defaultAlias = reRequire("../../alias"),
        env = process.env.NODE_ENV || "development",
        configPath = path.resolve(ROOT_PATH, "./treats.config.js"),
        serverWebpackConfigGenerator = require(`../config/webpack.config.server.${
            env === "development" ? "development" : "build"
        }`),
        clientWebpackConfigGenerator = require(`../config/webpack.config.client.${
            env === "development" ? "development" : "build"
        }`);
    let customConfig = {},
        webpack,
        alias = defaultAlias;
    if (fs.pathExistsSync(configPath)) {
        customConfig = reRequire(configPath);
    }

    if (!options || options.alias !== false) {
        alias = {
            ...customConfig.alias,
            ...defaultAlias
        };
    }

    if (!options || options.webpack !== false) {
        webpack = {
            client: clientWebpackConfigGenerator({ ...customConfig, alias }),
            server: serverWebpackConfigGenerator({ ...customConfig, alias })
        };
    }

    const config = {
        ...customConfig,
        alias,
        webpack
    };
    return config;
};

module.exports = loadTreatsConfig;
