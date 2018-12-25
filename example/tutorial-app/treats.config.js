const path = require("path");

const config = {
    app: {
        name: "tutorial-app",
        slug: "tutorial-app"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page"),
        "@graphql": path.resolve(__dirname, "./src/_graphql")
    }
};

module.exports = config;
