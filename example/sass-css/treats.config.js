const path = require("path");

const config = {
    app: {
        name: "less-css",
        slug: "less-css"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    }
};

module.exports = config;
