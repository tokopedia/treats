const path = require("path");

const config = {
    app: {
        name: "typescript-app",
        slug: "typescript-app"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    }
};

module.exports = config;
