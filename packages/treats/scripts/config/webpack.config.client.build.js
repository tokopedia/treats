const webpack = require("webpack"),
    fs = require("fs-extra"),
    path = require("path"),
    ExtractCSSChunks = require("extract-css-chunks-webpack-plugin"),
    { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"),
    CircularDependencyPlugin = require("circular-dependency-plugin"),
    babelOptions = require("./babel.config"),
    webpackMerge = require("webpack-merge"),
    babelMerge = require("babel-merge"),
    extractEnv = require("./util/extract-env"),
    workboxGenerator = require("./util/workbox-generator");

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
        clientOutputPath = webpackConfig.clientOutputPath || "public",
        resolve = {
            extensions: [".js", ".css"]
        },
        webpackConfigPlugin = webpackConfig.plugins || {};

    let workboxPlugin = [];
    if (webpackConfigPlugin.workbox) {
        workboxPlugin = workboxGenerator(webpackConfigPlugin.workbox);
    }

    const bundleAnalyzerPlugin = webpackOp === "analyze" ? [new BundleAnalyzerPlugin()] : [];

    const defaultConfig = {
        name: "client",
        target: "web",
        mode: "production",
        devtool: env === "production" ? "none" : "source-map",
        optimization: {
            splitChunks: {
                automaticNameDelimiter: "-",
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: "all",
                        name: "vendor"
                    }
                }
            },
            runtimeChunk: {
                name: "manifest"
            },
            noEmitOnErrors: true,
            moduleIds: "hashed"
        },
        entry: [alias["@@BUILD_CLIENT_APP_PATH@@"]],
        resolve: {
            ...resolve,
            alias
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
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
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules\/(?!(treats|@treats)\/).*/,
                    loader: "graphql-tag/loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        ExtractCSSChunks.loader,
                        {
                            loader: "css-loader",
                            options: {
                                localIdentName:
                                    env !== "production"
                                        ? "[name]__[local]___[hash:base64:5]"
                                        : "[hash:base64:8]",
                                modules: true,
                                importLoaders: 1,
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
                        ExtractCSSChunks.loader,
                        {
                            loader: "css-loader",
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
                        ExtractCSSChunks.loader,
                        {
                            loader: "css-loader",
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
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/,
                failOnError: true,
                cwd: process.cwd()
            }),
            new webpack.DefinePlugin({
                "process.env.TREATS_BUILD_ENV": {
                    ...buildEnv
                },
                "process.env.BUILD_TARGET": JSON.stringify("client"),
                ...webpackDefineEnv
            }),
            new ExtractCSSChunks({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name]-[contenthash].css",
                chunkFilename: "[name]-[contenthash].css",
                orderWarning: true, // Disable to remove warnings about conflicting order between imports
                cssModules: true // if you use cssModules, this can help.
            }),
            ...workboxPlugin,
            {
                apply: compiler => {
                    compiler.plugin("after-emit", (compilation, done) => {
                        const stats = compilation.getStats().toJson({
                            // node_modules/webpack/lib/Stats.js
                            hash: true,
                            version: true,
                            timings: false,
                            assets: true,
                            chunks: false,
                            chunkModules: false,
                            chunkOrigins: false,
                            modules: false,
                            cached: false,
                            reasons: false,
                            children: false,
                            source: false,
                            errors: false,
                            errorDetails: false,
                            warnings: false,
                            publicPath: true
                        });
                        delete stats.assets;
                        if (webpackConfigPlugin.workbox) {
                            stats.assetsByChunkName = {
                                ...stats.assetsByChunkName,
                                "service-worker": "service-worker.js"
                            };
                        }
                        fs.outputFile("stats/stats.json", JSON.stringify(stats), done);
                    });
                }
            },
            ...bundleAnalyzerPlugin
        ],
        output: {
            path: path.join(alias["@ROOT_DIR@"], clientOutputPath),
            chunkFilename: "[name]-[chunkhash].js",
            filename: "[name]-[chunkhash].js",
            publicPath
        }
    };
    let finalConfig = defaultConfig;
    if (webpackConfig.client) {
        finalConfig = webpackMerge.smart(defaultConfig, webpackConfig.client);
    }
    return finalConfig;
};
