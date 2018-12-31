//TODO INPUT DIR FOR VIEWS
const webpack = require("webpack"),
    fs = require("fs-extra"),
    path = require("path"),
    WebpackSourceMapSupport = require("webpack-source-map-support"),
    { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"),
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
            wdsPort,
            webpack: { define: webpackDefineEnv, op: webpackOp }
        } = extractEnv(process.env),
        publicPath = webpackConfig.publicPath || "/static/",
        serverOutputPath = webpack.serverOutputPath || "dist",
        resolve = {
            extensions: [".ts", ".tsx", ".js", ".css"]
        };

    //Add babel/preset-typescript when needed only
    // if (useTypescript) {
    //     babelOptions.presets.push("@babel/preset-typescript");
    //     babelOptions.env.test.presets.push("@babel/preset-typescript");
    // }

    const bundleAnalyzerPlugin = webpackOp === "analyze" ? [new BundleAnalyzerPlugin()] : [];
    const defaultConfig = {
        name: "server",
        target: "node",
        mode: "production",
        entry: [path.join(alias["@treats/server"], "./entry")],
        devtool: env === "production" ? "none" : "source-map",
        resolve: {
            ...resolve,
            alias
        },
        externals: fs
            .readdirSync("./node_modules")
            .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks|treats/.test(x))
            .reduce((externals, mod) => {
                externals[mod] = `commonjs ${mod}`;
                return externals;
            }, {}),
        node: {
            __dirname: false
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)?$/,
                    use: [
                        "thread-loader",
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
                        "thread-loader",
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
                                localIdentName:
                                    env !== "production"
                                        ? "[name]__[local]___[hash:base64:5]"
                                        : "[hash:base64:8]",
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
                                localIdentName:
                                    env !== "production"
                                        ? "[name]__[local]___[hash:base64:5]"
                                        : "[hash:base64:8]",
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
                                localIdentName:
                                    env !== "production"
                                        ? "[name]__[local]___[hash:base64:5]"
                                        : "[hash:base64:8]",
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
            new webpack.DefinePlugin({
                "process.env.TREATS_BUILD_ENV": {
                    ...buildEnv
                },
                "process.env.BUILD_TARGET": JSON.stringify("server"),
                ...webpackDefineEnv
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),
            ...bundleAnalyzerPlugin
        ],
        output: {
            path: path.join(alias["@ROOT_DIR@"], serverOutputPath),
            filename: "server.js"
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
