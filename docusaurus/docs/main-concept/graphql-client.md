---
id: graphql-client
title: GraphQL Client
sidebar_label: GraphQL Client
---

[GraphQL][GraphQL-website] is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

GraphQL Client implementation for Treats uses [Apollo Client 2.1][apollo-website]

## Customizing GraphQL Client Implementation
There's two scenarios available if you want to customize Treats GraphQL Client:

1. If you only needs to modify GraphQL http link uri and/or apollo-link-state resolver map, you can just leave other configs to us and just provides:
    - `uri.js` - This file can be used to configure http link uri:

        ```js
        // src/_graphql/uri.js
        const uri ="https://graphql.example.endpoint/graphql"
        export default uri
        ```

    - `link-state.js` - Apollo Client 2.1 comes with a solution to manage your local application state with GraphQL using [link-state][link-state-website], This file can be used to register resolver maps that would be used with link-state.

        ```js
        // src/_graphql/link-state.js
        const resolverA = {
            Mutation: {
                addTodo: (_, { text }, { cache }) => {
                ...
                return newTodo;
                },
                toggleTodo: (_, variables, { cache }) => {
                    ...
                return null;
                },
            },
        };
        const resolverB = {
            Mutation: {
                ...
            }
        };

        export default [resolverA, resolverB];
        ```

2. If you want to take more control of your GraphQL client config, you can provide `config.js` filesystem hooks:

```js
// src/_graphql/config.js
import { RetryLink } from "apollo-link-retry";

const customConfig = {
    queryDeduplication: true,
    link: [
        // using provided apollo-link-error
        {
            type: "error",
            callback: ({ graphQLErrors, networkError }) => {
                ...
            }
        },
        //using provided apollo-link-batch-http
        {
            type: "batch-http",
            uri: "http://example.graphql.endpoint/graphql"
        },
        //using custom installed RetryLink
        new RetryLink({
            delay: {
                initial: 300,
                max: Infinity,
                jitter: true
            },
            attempts: {
                max: 5,
                retryIf: (error, _operation) => !!error
            }
        })
    ]
};

export default customConfig;
```

We provides several apollo-link by default:
1. [batch-http][link-batch-http-website] - Batch HTTP requests together.
2. [http][link-http-website] - Normal HTTP requests link.
3. [error][link-error-website] - Error handling link.
4. [state][link-state-website] - Manage local state with GraphQL.

> Please note that there's still several apollo mandatory and best practices that we'll provides, for example turning ssrMode on server environment

More information about these filesystem hooks can be found [here][api-reference-filesystem-graphql]

## Using GraphQL Client
To use graphQL client we can import any apollo client components from `@treats/graphql`:

```js
// src/page/my-page/my-page.js
import React, { Component } from "react";
import { Query } from "@treats/graphql";
import myQuery from "../graphql/my-query.graphql";

class MyPage extends Component {
    ...
    render() {
        const { someParameter } = this.props;
        return (
            <div>
                <Query query={myQuery.myData} variables={someParameter}>
                    {({ data, loading, error }) => {
                        if(error) {
                            return (
                                <span>Error! {error}</span>
                            );
                        }
                        if(loading) {
                            return (
                                <span>Loading...</span>
                            );
                        }
                        return (
                            <span><RENDER SOMETHING WITH THE DATA><span>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default AsyncComponent(module, MyPage);
```

Then we define our graphQL query on a `.graphql` file:

```js
// src/graphql/my-query.graphql
query myData($param1: Int!, $param2: String) {
    data(param1: $param1, param2: $param2) {
        something {
            field1
            field2
            field3
        }
    }
}
```

> PROTIP: To disable SSR for Query component, we can just set its `ssr` props to `false`.

## Disable GraphQL Client
To disable GraphQL client and removes it from your build, you can set build config for GraphQLClient on `treats.config.js` to **false**:
```js
// treats.config.js

module.exports = {
    ...,
    build: {
        graphql: false
    },
    ...
}

```

Please note that with the above configuration, all GraphQL client related filesystem hooks wouldn't have any effect and you'll need to explicitly enable GraphQL client again from build config to start using them again.

More info about `treats.config.js` can be found on [build config][build-config] section.


[GraphQL-website]: https://GraphQL.org/
[apollo-website]: http://apolloGraphQL.com/
[link-state-website]: https://www.apollographql.com/docs/link/links/state.html
[link-batch-http-website]:
https://www.npmjs.com/package/apollo-link-batch-http
[link-http-website]:
https://www.npmjs.com/package/apollo-link-http
[link-error-website]:
https://www.apollographql.com/docs/apollo-server/data/errors/#gatsby-focus-wrapper
[api-reference-filesystem-graphql]:
../api-reference/filesystem-hooks.html#graphql-link-statejs
[build-config]: build-config.html
