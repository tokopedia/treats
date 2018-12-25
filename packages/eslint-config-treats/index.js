const path = require("path"),
    ROOT_PATH = process.cwd(),
    alias = require(path.join(ROOT_PATH, "./node_modules/treats/alias")),
    resolver = {
        map: Object.entries(alias),
        extensions: [".ts", ".js", ".jsx", ".json"]
    };

module.exports = {
    extends: ["airbnb", "prettier"],
    env: {
        browser: true,
        node: true,
        jest: true
    },
    globals: {
        shallow: false,
        render: false,
        mount: false,
        shallowToJson: false,
        renderToJson: false,
        mountToJson: false,
        shallowWithIntl: false,
        mountWithIntl: false
    },
    parser: "babel-eslint",
    settings: {
        "import/resolver": [
            "webpack",
            {
                alias: resolver
            }
        ],
        flowtype: {
            onlyFilesWithFlowAnnotation: true
        }
    },
    plugins: ["react", "jsx-a11y", "flowtype"]
};
