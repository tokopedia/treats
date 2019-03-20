const WorkboxWebpackPlugin = require("workbox-webpack-plugin"),
    logger = require("../../util/logger");

const cancelWorkboxInit = () => {
    logger("warn", "Cancelling workbox initialization");
    return [];
};

const configureWorkbox = workboxConfig => {
    const { pluginMode, options } = workboxConfig;

    if (!(pluginMode in WorkboxWebpackPlugin)) {
        logger("warn", `${pluginMode} is not a valid workblox plugin.`);
        return cancelWorkboxInit();
    }

    if (pluginMode === "InjectManifest") {
        const { swSrc } = options,
            isSwSrcExist = !!swSrc;

        if (!isSwSrcExist) {
            logger("warn", "swSrc is not allowed to be empty in InjectManifest mode.");
            return cancelWorkboxInit();
        }
    }

    return [new WorkboxWebpackPlugin[pluginMode](options)];
};

const getSWFilename = workboxConfig => workboxConfig.serviceWorkerFilename || "service-worker.js";

module.exports = {
    configureWorkbox,
    getSWFilename
};
