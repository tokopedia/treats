const reRequire = require("./re-require"),
    ROOT_PATH = process.cwd(),
    fs = require("fs-extra"),
    path = require("path"),
    logger = require("./logger");

/**
 * A function to copy user alias defined in treats.config.ts to tsconfig.json
 * @param configPathTypescript path to treats.config.ts
 */
const injectUserAliasToTypescriptConfig = configPathTypescript => {
    const treatsConfigTS = require(configPathTypescript),
        tsConfigJsonPath = path.resolve(ROOT_PATH, "./tsconfig.json");
    let tsConfigJson = require(tsConfigJsonPath);

    const userAlias = Object.keys(treatsConfigTS.alias).reduce((result, key) => {
        result[`${key}/*`] = [`./${path.relative(ROOT_PATH, treatsConfigTS.alias[key])}/*`];
        return result;
    }, {});

    tsConfigJson.compilerOptions.paths = {
        ...tsConfigJson.compilerOptions.paths,
        ...userAlias
    }

    //Writing alias to tsconfig.json
    logger("log", "Writing your alias into tsconfig.json");
    fs.writeFileSync(tsConfigJsonPath, JSON.stringify(tsConfigJson, (key, value) => value, 4), err => {
        logger("error", err.stack || err);
    });
};

/**
 * A function to read user-defined config and bundle it into single config
 * @param options options provided by developer when call this method
 */
const loadTreatsConfig = options => {
    const defaultAlias = reRequire("../../alias"),
        env = process.env.NODE_ENV || "development",
        configPath = path.resolve(ROOT_PATH, "./treats.config.js"),
        configPathTypescript = path.resolve(ROOT_PATH, "./treats.config.ts"),
        serverWebpackConfigGenerator = require(`../config/webpack.config.server.${
            env === "development" ? "development" : "build"
        }`),
        clientWebpackConfigGenerator = require(`../config/webpack.config.client.${
            env === "development" ? "development" : "build"
        }`);

    let customConfig = {},
        webpack,
        alias = defaultAlias;

    //Initialize customConfig with user-defined treats config
    if (fs.pathExistsSync(configPath)) {
        customConfig = reRequire(configPath);
    } else if (fs.pathExistsSync(configPathTypescript)) {
        //Initialize customConfig with treats.config.ts if exists
        customConfig = reRequire(configPathTypescript);
        injectUserAliasToTypescriptConfig(configPathTypescript);
    }

    //Add alias if defined in options
    if (!options || options.alias !== false) {
        alias = {
            ...customConfig.alias,
            ...defaultAlias
        };
    }

    //Init webpack for client and server
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
