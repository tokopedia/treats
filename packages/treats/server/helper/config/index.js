//@flow
import type { $Application } from "express";
import type { HelperInterfaceType } from "@treats/flow-typed/helper";
import type { EnvironmentVariableType } from "@treats/flow-typed/server";
import fs from "fs-extra";
import path from "path";
import { bindParams } from "@treats/util/json";

type ConfigHelperType = {
    ...HelperInterfaceType,
    configObj: ?Object,
    get: Function
};

const config: ConfigHelperType = {
    app: undefined,
    configObj: undefined,
    init(app: $Application, envVars: EnvironmentVariableType): boolean {
        const { configDir: configDirRelative } = envVars,
            configDir = path.resolve(__dirname, configDirRelative);
        let configString;

        if (configDir && fs.pathExistsSync(configDir)) {
            configString = fs.readFileSync(configDir, "utf-8");
            let cfg;

            if (configString) {
                cfg = JSON.parse(configString);
            }

            /* Bind Params into configs with jsonUtil */
            cfg = bindParams(cfg, envVars);
            this.configObj = cfg;
            console.info(`[Config] Config initialized from ${configDir}`);
        } else {
            console.warn(`[Config] Config file not found, configDir is ${configDir}`);
        }
        this.app = app;
        app.set("config", this);
        return true;
    },
    get(key: string): any {
        let result;
        if (!this.configObj) {
            console.debug(`[Config] Config Object not Initialized, cannot get ${key} from config`);
            return undefined;
        }
        if (key.indexOf(".")) {
            const keyArr = key.split(".");
            result = this.configObj;
            for (let i = 0; i < keyArr.length; i++) {
                result = result[keyArr[i]];
                if (typeof result === "undefined") {
                    break;
                }
            }
        } else {
            result = this.configObj[key];
        }

        if (typeof result === "undefined") {
            console.debug(`[Config] Config for key ${key} is undefined`);
        }
        return result;
    }
};

export default config;
