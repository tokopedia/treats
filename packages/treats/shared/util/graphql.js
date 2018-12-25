import merge from "lodash.merge";

export const mergeApolloConfig = (config1, config2) => {
    if (!config1) {
        return config2;
    } else if (!config2) {
        return config1;
    }
    return merge(config1, config2);
};

export const combineLinkStates = (...args) => merge(...args);
