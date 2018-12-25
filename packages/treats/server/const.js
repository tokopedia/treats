import path from "path";

export const DEFAULT_ENV = {
    env: process.env.NODE_ENV || "development",
    port: process.env.TREATS_PORT || 3000,
    logLevel:
        process.env.TREATS_LOG_LEVEL || process.env.NODE_ENV === "development" ? "silly" : "info",
    configDir: process.env.TREATS_CONFIG_DIR || "../treats.runtime-config.json",
    serveAssets: process.env.TREATS_SERVE_ASSET || false,
    serveAssetsURL: process.env.TREATS_SERVER_ASSET_URL || "/static"
};

export const ASSETS_PATH = path.join(__dirname, "../public");
