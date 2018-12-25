//@flow
import type { $Application } from "express";
import type { RedisClient } from "redis";
import redislib from "redis";
import Bluebird from "bluebird";

import type { HelperInterfaceType } from "treats/helper";

/*
    Promisify Redis Client with Bluebird
    https://github.com/NodeRedis/node_redis#promises
*/
Bluebird.promisifyAll(redislib.RedisClient.prototype);
Bluebird.promisifyAll(redislib.Multi.prototype);

type RedisHelperType = {
    ...HelperInterfaceType,
    destroy: Function,
    get: Function
};

const redis: RedisHelperType = {
    instance: undefined,
    app: undefined,
    init(app: $Application): boolean {
        console.verbose("[Redis] Initialize redis helper");
        this.instance = {};
        this.app = app;
        app.set("redis", this);

        return true;
    },
    destroy(): boolean {
        if (this.instance) {
            console.verbose("[Redis] Destroy redis helper");
            const pool = this.instance;

            Object.keys(pool).forEach((clientName: string) => {
                pool[clientName].quit();
            });
            this.app.set("redis", undefined);
            this.instance = undefined;
            return true;
        }
        return false;
    },
    get(name: string): ?RedisClient {
        let client;
        const pool = this.instance,
            appConfig = this.app.get("config"),
            redisConfig = appConfig.get("helper.redis");

        if (!pool[name]) {
            try {
                console.verbose(
                    `Creating redis client ${name} at ${redisConfig[name].host}${
                        redisConfig[name].port ? `:${redisConfig[name].port}` : ""
                    }`
                );

                client = redislib.createClient({ ...redisConfig[name], no_ready_check: true });
                client.on("error", (err: Error) => {
                    console.error(
                        `Redis error for client ${name} at ${redisConfig[name].host}${
                            redisConfig[name].port ? `:${redisConfig[name].port}` : ""
                        }`
                    );
                    console.error(err);
                });
                pool[name] = client;
            } catch (err) {
                console.error(
                    `Failed to create redis client ${name} at ${redisConfig[name].host}${
                        redisConfig[name].port ? `:${redisConfig[name].port}` : ""
                    }`
                );
                console.error(err.toString());
            }
        } else {
            console.verbose(`Redis client already exist ${name}, skipping....`);
            client = pool[name];
        }

        return client;
    }
};

export default redis;
