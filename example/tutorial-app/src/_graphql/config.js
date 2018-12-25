import uri from "./uri";

const customConfig = {
    queryDeduplication: true,
    link: [
        {
            type: "error",
            callback: ({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.error(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    ));

                if (networkError) console.error(`[Network error]: ${networkError}`);
            }
        },
        {
            type: "batch-http",
            uri: uri
        }
    ]
};

export default customConfig;
