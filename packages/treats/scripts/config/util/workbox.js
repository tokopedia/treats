const WorkboxWebpackPlugin = require("workbox-webpack-plugin"),
    logger = require("../../util/logger");

const cancelWorkboxInit = () => {
    logger("warn", "Cancelling workbox initialization");
    return [];
};

const configureWorkbox = workboxConfig => {
    const { pluginMode, serviceWorkerFilename: swFilename, options } = workboxConfig,
        guardedOptions = {
            ...options,
            swDest: swFilename || "service-worker.js"
        };

    if (!(pluginMode in WorkboxWebpackPlugin)) {
        logger("warn", `${pluginMode} is not a valid workblox plugin.`);
        return cancelWorkboxInit();
    }

    if (pluginMode === "InjectManifest") {
        const { swSrc } = guardedOptions,
            isSwSrcExist = !!swSrc;

        if (!isSwSrcExist) {
            logger("warn", "swSrc is not allowed to be empty in InjectManifest mode.");
            return cancelWorkboxInit();
        }
    }

    return [new WorkboxWebpackPlugin[pluginMode](guardedOptions)];
};

const getSWFilename = workboxConfig => workboxConfig.serviceWorkerFilename || "service-worker.js";

module.exports = {
    configureWorkbox,
    getSWFilename
};
