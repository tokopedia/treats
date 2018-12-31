const webpack = require("webpack"),
    path = require("path"),
    fs = require("fs-extra"),
    WebpackSourceMapSupport = require("webpack-source-map-support"),
    StartServerPlugin = require("../plugin/StartServerPlugin"),
    CircularDependencyPlugin = require("circular-dependency-plugin"),
    babelOptions = require("./babel.config"),
    babelMerge = require("babel-merge"),
    webpackMerge = require("webpack-merge"),
    extractEnv = require("./util/extract-env"),
    useTypescript = fs.pathExistsSync(path.resolve(process.cwd(), "./tsconfig.json"));

module.exports = ({
    alias,
    build: buildEnv,
    webpack: webpackConfig = {},
    postcss: postcssConfig = {},
    babel: babelConfig = {}
}) => {
    const {
            env,
            webpack: { define: webpackDefineEnv }
        } = extractEnv(process.env),
        publicPath = webpackConfig.publicPath || "/__TREATS_WDS__/",
        serverOutputPath = webpack.serverOutputPath || "dist",
        resolve = {
            extensions: [".ts", ".tsx", ".js", ".css", ".json", ".wasm", ".mjs"]
        };

    //Add babel/preset-typescript when needed only
    // if (useTypescript) {
    //     babelOptions.presets.push("@babel/preset-typescript");
    //     babelOptions.env.test.presets.push("@babel/preset-typescript");
    // }

    const defaultConfig = {
        name: "server",
        target: "node",
        mode: "development",
        devtool: "cheap-eval-source-map",
        entry: ["webpack/hot/signal?1000", path.join(alias["@treats/server"], "./entry")],
        externals: fs
            .readdirSync("./node_modules")
            .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks|treats/.test(x))
            .reduce((externals, mod) => {
                externals[mod] = `commonjs ${mod}`;
                return externals;
            }, {}),
        watch: true,
        resolve: {
            ...resolve,
            alias
        },
        node: {
            __dirname: false
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)?$/,
                    use: [
                        {
                            loader: "thread-loader",
                            options: {
                                poolTimeout: Infinity // keep workers alive for more effective watch mode
                            }
                        },
                        {
                            loader: "babel-loader",
                            options: babelMerge(babelConfig, babelOptions)
                        }
                    ],
                    exclude: /node_modules\/(?!(treats|@treats)\/).*/
                },
                {
                    test: /\.(ts|tsx)?$/,
                    use: [
                        "cache-loader",
                        {
                            loader: "thread-loader",
                            options: {
                                poolTimeout: Infinity // keep workers alive for more effective watch mode
                            }
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                happyPackMode: true
                            }
                        },
                        {
                            loader: "babel-loader",
                            options: babelMerge(babelConfig, babelOptions)
                        }
                    ],
                    exclude: /node_modules\/(?!(treats|@treats)\/).*/
                },
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules\/(?!(treats|@treats)\/).*/,
                    loader: "graphql-tag/loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "css-loader/locals",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: __dirname,
                                    ctx: {
                                        ...postcssConfig,
                                        alias
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        {
                            loader: "css-loader/locals",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: __dirname,
                                    ctx: {
                                        ...postcssConfig,
                                        alias
                                    }
                                }
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                },
                {
                    test: /\.(less)$/,
                    use: [
                        {
                            loader: "css-loader/locals",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: __dirname,
                                    ctx: {
                                        ...postcssConfig,
                                        alias
                                    }
                                }
                            }
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|svg|gif)?$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "img/[name]-[hash].[ext]",
                            publicPath
                        }
                    }
                },
                {
                    test: /\.(mp3|wav|ogg|mp4|webm|mpg|mpeg|mov|wmv|swf|flv)?$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "media/[name]-[hash].[ext]",
                            publicPath
                        }
                    }
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "font/[name]-[hash].[ext]",
                            publicPath
                        }
                    }
                }
            ]
        },
        plugins: [
            new WebpackSourceMapSupport(),
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/,
                failOnError: true,
                cwd: process.cwd()
            }),
            new StartServerPlugin({
                name: "../server.js"
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                "process.env.TREATS_BUILD_ENV": {
                    ...buildEnv
                },
                "process.env.BUILD_TARGET": JSON.stringify("server"),
                ...webpackDefineEnv
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        output: {
            path: path.join(alias["@ROOT_DIR@"], serverOutputPath),
            filename: "server.js",
            devtoolModuleFilenameTemplate: "[absolute-resource-path]"
        }
    };
    let finalConfig = defaultConfig;
    if (useTypescript) {
        ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"),
        finalConfig.plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticError: true }));
    }
    if (webpackConfig.server) {
        finalConfig = webpackMerge.smart(defaultConfig, webpackConfig.server);
    }
    return finalConfig;
};
