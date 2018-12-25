import { transports } from "winston";

const defaultTimestamp = () => new Date().toLocaleString();

let TRANSPORT_CONFIG;
if (process.env.NODE_ENV === "development") {
    TRANSPORT_CONFIG = {
        Console: {
            level: "debug",
            colorize: true,
            json: false,
            timestamp: defaultTimestamp
        }
    };
} else {
    TRANSPORT_CONFIG = {
        Console: {
            level: "error",
            colorize: true,
            json: false,
            timestamp: defaultTimestamp
        }
    };
}

const loggerTransport = {
    buildInstance: (name, config) => {
        let instance;
        switch (name) {
            default:
                instance = new transports[name](config);
                break;
        }
        return instance;
    },
    init: (env, logLevel) => {
        const transport = [],
            transportConfig = TRANSPORT_CONFIG;

        Object.keys(transportConfig).forEach(key => {
            let config = transportConfig[key];

            /* If logLevel specified then we can override the log level from default configuration */
            if (logLevel) {
                config = { ...config, level: logLevel };
            }

            const instance = loggerTransport.buildInstance(key, config);
            transport.push(instance);
        });

        return transport;
    }
};

export default loggerTransport;
