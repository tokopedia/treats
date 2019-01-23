const ROOT_PATH = process.cwd(),
    fs = require("fs-extra"),
    path = require("path"),
    logger = require("./logger"),
    defaultTSConfig = {
        compilerOptions: {
            target: "es5",
            allowJs: true,
            skipLibCheck: true,
            allowSyntheticDefaultImports: true,
            strict: true,
            forceConsistentCasingInFileNames: true,
            module: "esnext",
            moduleResolution: "node",
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: "preserve",
            outDir: "./dist/",
            esModuleInterop: true,
            lib: ["esnext", "dom"],
            baseUrl: ".",
            paths: {
                "@treats/server": ["./node_modules/treats/server"],
                "@treats/client": ["./node_modules/treats/client"],
                "@treats/component": ["./node_modules/treats/shared/component"],
                "@treats/util": ["./node_modules/treats/shared/util"],
                "@treats/route": ["./node_modules/treats/shared/route"],
                "@treats/alias": ["./node_modules/treats/shared/alias"],
                "@treats/redux": ["./node_modules/treats/shared/proxy/redux.js"],
                "@treats/router": ["./node_modules/treats/shared/proxy/router.js"],
                "@treats/intl": ["./node_modules/react-intl"],
                "@treats/helmet": ["./node_modules/react-helmet"],
                "@treats/graphql": ["./node_modules/react-apollo"],
                "@treats/locale-data": ["./node_modules/react-intl/locale-data"]
            }
        },
        include: ["src"],
        exclude: ["node_modules"]
    };

/**
 * A function to copy user typescript configurations in treats.config.(js|ts) to tsconfig.json
 * @param configPath path to treats.config.(js|ts)
 */
const generateTSConfig = configPath => {
    const treatsConfig = require(configPath),
        userTSConfig = treatsConfig.typescript,
        tsConfigJsonPath = path.resolve(ROOT_PATH, "./tsconfig.json");
    let tsConfigJSON = {};

    const userAlias = Object.keys(treatsConfig.alias).reduce((result, key) => {
        result[`${key}/*`] = [`./${path.relative(ROOT_PATH, treatsConfig.alias[key])}/*`];
        return result;
    }, {});

    //Override default config with user config, if user provided it in treats.config.(js|ts)
    tsConfigJSON = {
        ...defaultTSConfig,
        ...userTSConfig
    };

    if (userTSConfig && userTSConfig.compilerOptions) {
        tsConfigJSON = {
            ...tsConfigJSON,
            compilerOptions: {
                ...defaultTSConfig.compilerOptions,
                ...userTSConfig.compilerOptions,
                paths: {
                    ...defaultTSConfig.compilerOptions.paths,
                    ...userTSConfig.compilerOptions.paths,
                    ...userAlias
                }
            }
        };
    } else {
        tsConfigJSON = {
            ...tsConfigJSON,
            compilerOptions: {
                ...defaultTSConfig.compilerOptions,
                // Override paths with user treats typescript paths config then with user alias
                paths: {
                    ...defaultTSConfig.compilerOptions.paths,
                    ...userAlias
                }
            }
        };
    }

    //Writing alias to tsconfig.json
    logger("log", "Writing your typescript config into tsconfig.json...");
    fs.writeFileSync(
        tsConfigJsonPath,
        JSON.stringify(tsConfigJSON, (key, value) => value, 4),
        err => {
            logger("error", "Error when writing your tsconfig.json");
            logger("error", err.stack || err);
        }
    );
    logger("log", "tsconfig.json successfully generated!");
};

module.exports = generateTSConfig;
