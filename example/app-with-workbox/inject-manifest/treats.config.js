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
            pluginMode: "InjectManifest",
            options: {
                // swSrc option is mandatory if 'injectManifest' plugin is used
                swSrc: "./src/service-worker/sw.js"
            }
        }
    }
};

module.exports = config;
