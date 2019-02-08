const path = require("path");

const config = {
    app: {
        name: "todo",
        slug: "todo"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    }
};

module.exports = config;
