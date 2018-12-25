import React, { Fragment } from "react";
import { IntlProvider } from "@treats/intl";

let ReduxProvider = Fragment,
    ApolloProvider = Fragment;

if (process.env.TREATS_BUILD_ENV.redux !== false) {
    ReduxProvider = require("react-redux").Provider;
}

if (process.env.TREATS_BUILD_ENV.graphql !== false) {
    ApolloProvider = require("react-apollo").ApolloProvider;
}

const Provider = ({ reduxStore, apolloClient, intlProps, children }) => {
    const apolloProps = {},
        reduxProps = {};

    if (process.env.TREATS_BUILD_ENV.redux !== false) {
        reduxProps.store = reduxStore;
    }

    if (process.env.TREATS_BUILD_ENV.graphql !== false) {
        apolloProps.client = apolloClient;
    }

    return (
        <ReduxProvider {...reduxProps}>
            <ApolloProvider {...apolloProps}>
                <IntlProvider key={`${intlProps.locale}`} {...intlProps}>
                    {children}
                </IntlProvider>
            </ApolloProvider>
        </ReduxProvider>
    );
};

export default Provider;
