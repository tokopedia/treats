const path = require("path");

const config = {
    app: {
        name: "app-with-workbox",
        slug: "app-with-workbox"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    },
    webpack: {
        workbox: {
            pluginMode: "GenerateSW",
            options: {
                swDest: "sw.js",
                skipWaiting: true,
                clientsClaim: true
            }
        }
    }
};

module.exports = config;
