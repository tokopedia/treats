//@flow
import type { $Application } from "express";
import type { HelperInterfaceType } from "@treats/flow-typed/helper";
import fs from "fs-extra";

import directory from "./directory";

type AssetsHelperType = {
    ...HelperInterfaceType,
    stats: ?Object,
    set: Function,
    get: Function
};

let chokidar;
if(process.env.NODE_ENV === "development") {
    chokidar = require("chokidar");
}

const assets: AssetsHelperType = {
    app: undefined,
    stats: undefined,
    set(): boolean {
        try {
            console.verbose(
                `[Assets] Trying to get Asset Stats from ${directory.STATS_DIR}/stats.json`
            );
            const assetsStats = JSON.parse(fs.readFileSync(`${directory.STATS_DIR}/stats.json`));
            this.stats = assetsStats;
            console.verbose("[Assets] Get Asset Stats finished");
        } catch (err) {
            console.error("[Assets] Get Assets Stats Failed");
            console.error(err);
            return false;
        }
        return true;
    },
    get(): Object {
        return this.stats;
    },
    init(app: $Application): boolean {
        this.app = app;
        app.set("assets", this);

        if (process.env.NODE_ENV === "development") {
            /** HOT RELOADING ASSET STATS ON DEVELOPMENT */
            let retries = 0;
            const getStatsInterval = setInterval(() => {
                console.verbose("Getting stats file...");
                if (fs.pathExistsSync(`${directory.STATS_DIR}/stats.json`)) {
                    console.verbose(
                        `Stats File found at ${directory.STATS_DIR}/stats.json, watching...`
                    );
                    this.set();
                    if (process.env.NODE_ENV === "development" && this.stats) {
                        const openBrowser = require("react-dev-utils/openBrowser");
                        if(!process.env.TREATS_BROWSER_OPEN) {
                            process.env.TREATS_BROWSER_OPEN = true;
                            openBrowser(`${process.env.TREATS_HOST}:${process.env.TREATS_PORT}`);
                        }
                    }
                    const watcher = chokidar.watch(`${directory.STATS_DIR}/stats.json`, { ignoreInitial: true }).on("all", () => {
                        console.verbose("Stats File changed, reloading...");
                        this.set();
                    });
                    clearInterval(getStatsInterval);
                    return;
                } else if (retries > 50) {
                    console.verbose(
                        "Stats File not found after 50 retries, make sure your client build succeeded!"
                    );
                }
                retries += 1;
                console.verbose(
                    `Stats file not found at ${
                        directory.STATS_DIR
                    }/stats.json, retrying after 1000ms....`
                );
            }, 1000);
            return true;
        }

        try {
            this.set();
        } catch (err) {
            console.error(`[Assets] Error, cannot set Assets Stats: ${err}`);
            return false;
        }

        return true;
    }
};

export default assets;
