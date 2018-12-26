module.exports = {
    babelrc: false,
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow", "@babel/preset-typescript"],
    plugins: [
        "react-hot-loader/babel",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-proposal-logical-assignment-operators",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-optional-chaining",
        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
        "@babel/plugin-proposal-throw-expressions",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-transform-object-assign",
        ["babel-plugin-universal-import", { disableWarnings: true }]
    ],
    env: {
        test: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow", "@babel/preset-typescript"],
            plugins: [
                "react-hot-loader/babel",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                "@babel/plugin-proposal-do-expressions",
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-json-strings",
                "@babel/plugin-proposal-logical-assignment-operators",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-optional-chaining",
                ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
                "@babel/plugin-proposal-throw-expressions",
                "@babel/plugin-syntax-import-meta",
                "@babel/plugin-transform-object-assign",
                ["babel-plugin-universal-import", { disableWarnings: true }]
            ]
        }
    }
};
