import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BatchHttpLink } from "apollo-link-batch-http";
import { createHttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { combineLinkStates } from "@treats/util/graphql";

import { isArray } from "@treats/util/typecheck";

const createLinkState = (state, cache) => {
    const linkState = isArray(state) ? combineLinkStates(...state) : state;
    return {
        cache,
        ...linkState
    };
};

const linkGenerator = link => {
    if (link.type) {
        const {
            type,
            uri,
            cache,
            state,
            callback,
            fetch,
            credentials = "include",
            ...options
        } = link;
        switch (type) {
            case "batch-http":
                return new BatchHttpLink({
                    uri,
                    credentials,
                    fetch,
                    ...options
                });
            case "error":
                return onError(callback);
            case "state":
                return withClientState(createLinkState(state, cache));
            case "http":
            default:
                return createHttpLink({
                    uri,
                    fetch,
                    credentials,
                    ...options
                });
        }
    }
    return link;
};

const configureApolloClient = (initialState, config) => {
    if (!config) {
        console.error("[Graphql] Can't configure client, config is undefined");
        return undefined;
    }

    if (!config.cache) {
        config.cache = initialState
            ? new InMemoryCache().restore(initialState)
            : new InMemoryCache();
    }
    let links;
    if (isArray(config.link)) {
        links = config.link.map(link =>
            linkGenerator({
                uri: config.uri,
                cache: config.cache,
                ...config.linkConfig,
                ...link
            }));
    } else {
        links = linkGenerator({
            uri: config.uri,
            cache: config.cache,
            ...config.linkConfig,
            ...config.link
        });
    }

    if (links) {
        if (isArray(links)) {
            config.link = links.length > 1 ? ApolloLink.from(links) : links[0];
        } else {
            config.link = links;
        }
    }

    return new ApolloClient(config);
};

export default configureApolloClient;
