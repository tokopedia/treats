import URI from "@@BUILD_GRAPHQL_URI_PATH@@";
import LinkState from "@@BUILD_GRAPHQL_LINK_STATE_PATH@@";
import customConfig from "@@BUILD_GRAPHQL_CLIENT_CONFIG_PATH@@";
import { mergeApolloConfig } from "@treats/util/graphql";

const defaultConfig = {
    queryDeduplication: true,
    connectToDevTools: process.env.BUILD_TARGET !== "server",
    uri: URI,
    link: [
        {
            type: "error",
            callback: ({ graphQLErrors, networkError, response, operation }) => {
                if (graphQLErrors) {
                    graphQLErrors.map(({ message, locations, path }) =>
                        console.error(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        ));
                }

                if (networkError) {
                    console.error(`[Network error]: ${networkError}`);
                }
                if (process.env.BUILD_TARGET === "server" && (networkError || graphQLErrors)) {
                    if (operation) {
                        console.error("At operation:");
                        console.error(operation);
                    }
                    if (response) {
                        console.error("With response:");
                        console.error(response);
                    }
                }
            }
        }
    ]
};

let finalConfig;
if (process.env.BUILD_TARGET === "server") {
    finalConfig = serverConfig => {
        let result;
        if (!customConfig) {
            const links = [];
            if (LinkState) {
                links.push({
                    type: "state",
                    state: LinkState
                });
            }
            if (URI) {
                links.push({
                    type: "batch-http"
                });
            }
            result = mergeApolloConfig(
                {
                    ...defaultConfig,
                    link: [...defaultConfig.link, ...links]
                },
                serverConfig
            );
        } else {
            // use default link if not specified
            if (!customConfig.link) {
                console.warn(
                    "[GraphQL] Link not specified in your Apollo config object, link is mandatory for Apollo Client 2.1^, using default link configuration"
                );
                customConfig.link = defaultConfig.link;
                if (LinkState) {
                    customConfig.link.push({
                        type: "state",
                        state: LinkState
                    });
                }
                if (URI) {
                    customConfig.link.push({
                        type: "batch-http"
                    });
                }
            }
            result = mergeApolloConfig(customConfig, serverConfig);
        }
        return result;
    };
} else {
    finalConfig = () => {
        let result;
        if (!customConfig) {
            const links = [];
            if (LinkState) {
                links.push({
                    type: "state",
                    state: LinkState
                });
            }
            if (URI) {
                links.push({
                    type: "batch-http"
                });
            }
            result = mergeApolloConfig({
                ...defaultConfig,
                link: [...defaultConfig.link, ...links]
            });
        } else {
            // use default link if not specified
            if (!customConfig.link) {
                console.warn(
                    "[GraphQL] Link not specified in your Apollo config object, link is mandatory for Apollo Client 2.1^, using default link configuration"
                );
                customConfig.link = defaultConfig.link;
                if (LinkState) {
                    customConfig.link.push({
                        type: "state",
                        state: LinkState
                    });
                }
                if (URI) {
                    customConfig.link.push({
                        type: "batch-http"
                    });
                }
            }
            result = customConfig;
        }
        return result;
    };
}

const exportedConfig = finalConfig;

export default exportedConfig;
