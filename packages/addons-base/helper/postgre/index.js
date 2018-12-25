//@flow
import type { $Application } from "express";
import type { PG_ERROR } from "pg-promise";
import pgPromiseLib from "pg-promise";

import type { HelperInterfaceType } from "treats/helper";

const pgPromise = pgPromiseLib({
    error: (err: PG_ERROR) => {
        console.error("Postgre Error");
        console.error(err.toString());
    }
});

type PostgreHelperType = {
    ...HelperInterfaceType,
    destroy: Function,
    get: Function
};

const postgre: PostgreHelperType = {
    app: undefined,
    instance: undefined,
    init(app: $Application): boolean {
        console.verbose("[Postgre] Initialize postgre helper");
        this.instance = {};
        this.app = app;
        app.set("postgre", this);
        return true;
    },
    destroy(): boolean {
        if (this.instance) {
            console.verbose("[Postgre] destroy postgre helper");
            this.instance = undefined;
            this.app.set("postgre", undefined);
            return true;
        }
        return false;
    },
    get(name: string): ?pgPromise {
        let client;
        const pool = this.instance,
            appConfig = this.app.get("config"),
            postgreConfig = appConfig.get("helper.postgre");

        if (!pool[name]) {
            try {
                console.verbose(
                    `Creating postgre client for ${name} at ${
                        postgreConfig[name].host ? postgreConfig[name].host : ""
                    }${postgreConfig[name].port ? `:${postgreConfig[name].port}` : ""}`
                );

                client = pgPromise(postgreConfig[name]);

                pool[name] = client;
            } catch (err) {
                console.error(
                    `Failed to create postgre client for ${name} at ${postgreConfig[name].host}:${
                        postgreConfig[name].port
                    }`
                );
                console.error(err);
                return undefined;
            }
        } else {
            client = pool[name];
        }
        return client;
    }
};

export default postgre;
