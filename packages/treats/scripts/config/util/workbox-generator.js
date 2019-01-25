const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const workboxGenerator = workboxConfig => {
    let workboxPlugin = [];
    const {
        pluginMode,
        options
    } = workboxConfig;

    if (!(pluginMode in WorkboxWebpackPlugin)) {
        console.error(`Workbox error: ${pluginMode} is not a valid workbox plugin mode`);
        return workboxPlugin;
    }
    else {
        if (pluginMode === "InjectManifest") {
            const {
                swSrc
            } = options;

            if (!swSrc || swSrc === "") {
                console.error("swSrc option is not allowed to be empty in InjectManifest mode. Cancelling workbox initialization");
                return workboxPlugin
            }
        }

        workboxPlugin = [new WorkboxWebpackPlugin[pluginMode](options)];
        return workboxPlugin;
    }
}

module.exports = workboxGenerator;