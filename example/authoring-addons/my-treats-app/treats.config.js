const path = require("path");

const config = {
    app: {
        name: "my-treats-app",
        slug: "my-treats-app"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    }
};

module.exports = config;
