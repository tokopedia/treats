const initWDSProxy = () => {
    /** Proxying WDS Request to WDS Server to enable LiveShare */
    const proxy = require("http-proxy-middleware"),
        pathRewrite = {
            "^/__TREATS_WDS__/info": "/sockjs-node/info",
            "^/__TREATS_WDS__": ""
        },
        pathRewriteKey = Object.keys(pathRewrite),
        pathRewriteRegexes = pathRewriteKey.map(key => new RegExp(key));
    global.__WDS_PROXY = proxy({
        ws: true,
        target: `http://127.0.0.1:${process.env.WDS_PORT}`,
        logLevel: "silent",
        pathRewrite: (path, req) => {
            let result = path;
            if (!req.protocol) {
                // Websocket requests
                result = path.replace("/__TREATS_WDS__/", "/sockjs-node/");
            } else {
                for (let i = 0; i < pathRewriteKey.length; i++) {
                    if (pathRewriteRegexes[i].test(path)) {
                        result = path.replace(
                            pathRewriteRegexes[i],
                            pathRewrite[pathRewriteKey[i]]
                        );
                        break;
                    }
                }
            }
            return result;
        }
    });
};

export default initWDSProxy;
