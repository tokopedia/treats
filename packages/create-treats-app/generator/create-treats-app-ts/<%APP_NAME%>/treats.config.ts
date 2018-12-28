const path = require("path");
 
const config = {
    app: {
        name: "<%APP_NAME%>",
        slug: "<%APP_NAME%>"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    }
};

module.exports = config;
