//@flow
import type { HelperInterfaceType } from "treats/helper";
import type { $Application } from "express";
import CBLib from "opossum";
import { DEFAULT_CB_CONFIG } from "./const";

type CircuitBreakerHelperType = {
    ...HelperInterfaceType,
    call: Function
};

const CircuitBreaker: CircuitBreakerHelperType = {
    instance: undefined,
    app: undefined,
    init(app: $Application): boolean {
        console.verbose("[CircuitBreaker] Initialize circuitbreaker helper");
        this.instance = {};
        this.app = app;
        app.set("circuitbreaker", this);

        return true;
    },
    call(
        apiCall: Function,
        endpoint: string,
        params: Array,
        callbacks: { [string]: Function }
    ): Promise {
        let cbInstance;

        if (!this.instance || !this.app) {
            console.error(
                "[CircuitBreaker] Circuit breaker instance not found, most likely forgot to init the helper."
            );
            return undefined;
        }

        if (!this.instance[endpoint]) {
            const appConfig = this.app.get("config"),
                cbConfig = appConfig.get("helper.circuitbreaker");
            let endpointOptions = DEFAULT_CB_CONFIG;
            if (cbConfig) {
                const endpointConfig = cbConfig[endpoint] || cbConfig.default;
                endpointOptions = { ...endpointOptions, ...endpointConfig };
            }
            this.instance[endpoint] = CBLib(apiCall, endpointOptions);
            cbInstance = this.instance[endpoint];
            cbInstance.fallback(
                (...args: Array): Promise => {
                    console.error(`[CircuitBreaker] Fallback for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onFallback(
                            {
                                status: "fallback",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "success",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Success for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onSuccess(
                            {
                                status: "success",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "failure",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Failure for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onError(
                            {
                                status: "error",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "open",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Open for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onOpen(
                            {
                                status: "open",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "close",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Close for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onClose(
                            {
                                status: "close",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "halfOpen",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Half Open for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onHalfOpen(
                            {
                                status: "half-open",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "reject",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Reject for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onReject(
                            {
                                status: "reject",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
            cbInstance.on(
                "timeout",
                (...args: Array): Promise => {
                    console.verbose(`[CircuitBreaker] Timeout for ${endpoint}`);
                    return (
                        callbacks &&
                        callbacks.onTimeout(
                            {
                                status: "timeout",
                                endpoint
                            },
                            ...args
                        )
                    );
                }
            );
        }
        cbInstance = this.instance[endpoint];
        return cbInstance.fire(...params);
    }
};

export default CircuitBreaker;
