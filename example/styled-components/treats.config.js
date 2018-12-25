const path = require("path");

const config = {
    app: {
        name: "emotion-example",
        slug: "emotion-example"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    },
    babel: {
        plugins: ["babel-plugin-styled-components"]
    }
};

module.exports = config;
