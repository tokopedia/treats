const path = require("path");

const config = {
    app: {
        name: "todo",
        slug: "todo"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@graphql": path.resolve(__dirname, "./src/_graphql"),
        "@component": path.resolve(__dirname, "./src/component")
    }
};

module.exports = config;
