//@flow
import type { $Application } from "express";
import type { HelperInterfaceType } from "@treats/flow-typed/helper";
import type { EnvironmentVariableType } from "@treats/flow-typed/server";
import winston from "winston";

import loggerTransport from "./transport";

winston.emitErrs = true;

type LoggerHelperType = {
    ...HelperInterfaceType,
    instance: ?winston.Logger,
    stream: Object
};

const logger: LoggerHelperType = {
    app: undefined,
    instance: undefined,
    init(
        app: $Application,
        { logLevel, env }: EnvironmentVariableType
    ): boolean {
        this.instance = new winston.Logger({
            transports: loggerTransport.init(env, logLevel)
        });
        /* eslint-disable no-console */
        console.log = (...args: any) => {
            this.instance.info.call(this.instance, ...args);
        };
        console.info = (...args: any) => {
            this.instance.info.call(this.instance, ...args);
        };
        console.silly = (...args: any) => {
            this.instance.silly.call(this.instance, ...args);
        };
        console.verbose = (...args: any) => {
            this.instance.verbose.call(this.instance, ...args);
        };
        console.warn = (...args: any) => {
            this.instance.warn.call(this.instance, ...args);
        };
        console.error = (...args: any) => {
            this.instance.error.call(this.instance, ...args);
        };
        console.debug = (...args: any) => {
            this.instance.debug.call(this.instance, ...args);
        };
        this.app = app;
        app.set("logger", this);
        /* eslint-enable */
        return true;
    },
    stream: {
        write: (message: string) => {
            console.info(message);
        }
    }
};

export default logger;
