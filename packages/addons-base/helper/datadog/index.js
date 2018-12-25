//@flow
import type { $Application } from "express";
import { StatsD } from "hot-shots";

import type { HelperInterfaceType } from "treats/helper";

type DatadogHelperType = {
    ...HelperInterfaceType,
    instance: ?StatsD,
    track: Function
};

const datadog: DatadogHelperType = {
    app: undefined,
    instance: undefined,
    init(app: $Application): boolean {
        const appConfig = app.get("config"),
            ddogConfig = appConfig.get("helper.datadog");

        if (ddogConfig) {
            this.app = app;
            this.instance = new StatsD(ddogConfig.host);
            app.set("datadog", this);
        }
        return true;
    },
    track(cmd: string, metric: any, ...args: any): boolean {
        if (this.instance) {
            console.verbose(`[Datadog] Track ${cmd} ${metric}`);
            this.instance[cmd](metric, ...args);
            return true;
        }
        return false;
    }
};

export default datadog;
