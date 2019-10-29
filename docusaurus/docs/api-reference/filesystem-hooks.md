---
id: filesystem-hooks
title: Filesystem Hooks
sidebar_label: Filesystem Hooks
---

Treats uses several files and folders as APIs for customizing app implementations. Filesystem hooks let your code to easily injects any implementations to Treats internal. These filesystem hooks can be supplied under `src/_**` directories.

### _server/index.js
This filesystem hook can be used to inject Treats server app implementation. With this filesystem hooks you can provide custom server apps. You can also register custom middlewares, helpers and server-side events here. Use [`initServer` helper function][treats-server-init] from `@treats/server` for easier server app creation. For example:
```
// src/_server/index.js
import initServer from "@treats/server";
import { customMiddlewareA, customMiddlewareB } from "@treats/addons-example";

const app = initServer({
    customMiddlewares: [customMiddlewareA, customMiddlewareB]
});

export default app;
```

### _client/index.js
This filesystem hook can be used to inject Treats client app implementation. Use `initClient` from `@treats/client` for easier client app creation. For example:

```
// src/_client/index.js
import initClient from "@treats/client";

const app = initClient();

export default app;
```

### _app/index.js
This filesystem hooks can be used to inject React app implementation. For example:
```
import React, { Component } from "react";
import { Helmet } from "@treats/helmet";
import { Route, Switch } from "@treats/router";
import routes from "@treats/route";

class App extends Component {
    render() {
        const { language } = this.props;
        return (
            <div id="my-custom-app">
                <Helmet>
                    <html lang={language} />
                </Helmet>
                <Switch>
                    {routes.map(entry => (
                        <Route key={entry.path} {...entry} />
                    ))}
                </Switch>  
            </div> 
        )
    }
}

export default App;
```

### _app/app.css
This filesystem hooks can be used to inject global css to your app without providing custom App implementation. For example:
```
@import "./bootstrap.css";
body {
    position: relative;
}
```

### _route/route.js
This filesystem hook serves as route configuration for your app.
```
export default [
    {
        path: "/my-page",
        exact: true,  
    },
    {
        path: "/page/:id",
        template: "custom-template"
    },
]
```

For routing, Treats uses [react-router-v4][react-router] under the hood, with additional configuration field that's specific to Treats use-case:
1. **path** - Any valid URL path that [path-to-regexp][path-to-regexp] understands.
2. **exact** - When **true**, will only match if the path matches the location.pathname exactly.
3. **strict** - When **true**, a path that has a trailing slash will only match a location.pathname with a trailing slash. This has no effect when there are additional URL segments in the location.pathname.
4. **sensitive** - When **true**, will match if the path is case sensitive.
5. **isPush** - When **false**, will block client-side routing and force page to reload.
6. **template** - Server-side template name to be used on this route.

### _route/module.js
This filesystem hook can be used to register page for your routes. For example:
```
// src/_route/module.js
import MyPage from "@page/my-page";
import Page2 from "@page/page2";

export default {
    "/my-page": MyPage,
    "/page/:id": Page2
}
```

### _server/template.js
This filesystem hook can be used to register server-side template. For example:
```
// src/_server/template.js
const templates = {
    myTemplate: renderParams => {
        const {
            helmet,
            cssTags,
            cssHash,
            reduxState,
            apolloState,
            reactMarkup,
            jsTags
        } = renderParams;

        return `<!DOCTYPE html>
        <html ${helmet.htmlAttributes}>
        <head>
                ${helmet.title}
                ${helmet.meta}
                ${helmet.link}
                ${cssTags}
                ${cssHash}
                <script>
                    ${reduxState ? `window.__data=${reduxState};` : ""}
                    ${apolloState ? `window.__apollo=${apolloState};` : ""} 
                </script>
        </head>
        <body ${helmet.bodyAttributes}>
            <div id="treats-root">${reactMarkup}</div>
            ${helmet.script}
            ${jsTags}
        </body>
        </html>`;
    }
};

export default templates;
```

### _locale/index.js
This filesystem hook can be used to inject translation json for your server-side app:
```
// src/_locale/en.json
{
    "translation_entry": "Translation"
}
```
```
// src/_locale/id.json
{
    "translation_entry": "Translation"
}
```
```
// src/_locale/index.js
import en from "./en.json";
import id from "./id.json";

export default {
    en,
    id
};
```

### _locale/resolver.js
This filesystem hook can be used to dynamically import your translation messages and locale data:
```
// src/_locale/resolver.js
const resolver = lang => {
    switch (lang) {
        case "id":
            return Promise.all([
                import("@treats/locale-data/id"),
                import("./id.json")
            ]);
        case "en":
        default:
            return Promise.all([
                import("@treats/locale-data/en"),
                import("./en.json")
            ]);
    }
};

export default resolver;
```

### _redux/middleware.js
This filesystem hooks can be used to register Redux middleware to be used within our redux store:
```
// src/_redux/middleware.js
import thunk from "redux-thunk";
import { logger } from "redux-logger";
export default [thunk, logger];
```

> This filesystem hook will be deactivated if redux set to `false` in build config.

### _redux/reducer.js
This filesystem hooks can be used to register root reducers that would be used in your app:
```
// src/_redux/reducer.js
import { combineReducers } from "@treats/redux";
import HomeReducer from "./home";
import AboutReducer from "./about";

export default combineReducers({
    home: HomeReducer,
    about: AboutReducer
});
```

> This filesystem hook will be deactivated if redux set to `false` in build config.

### _graphql/link-state.js
This filesystem hooks can be used to register Apollo Link State resolvers that would be used in your app:
```
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
> This filesystem hook will be deactivated if graphql set to `false` in build config.

### _graphql/uri.js
This filesystem hooks can be used to register Apollo Batch HTTP link URI, this should be filled with your GraphQL server URI:
```
// src/_graphql/uri.js
const uri ="https://example.graphql.endpoint/graphql"
export default uri
```

> This filesystem hook will be deactivated if graphql set to `false` in build config.

### _graphql/config.js
This filesystem hooks can be used if you want to supply your own Apollo Client config. For example:

```
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

> This filesystem hook will override Apollo link state and URI config if it is specified.

> This filesystem hook will be deactivated if graphql set to `false` in build config.

[treats-server-init]: ./server.html#initServer
[react-router]: https://reacttraining.com/react-router
[path-to-regexp]: https://www.npmjs.com/package/path-to-regexp
[link-state-website]: https://www.apollographql.com/docs/link/links/state.html
[link-batch-http-website]:
https://www.npmjs.com/package/apollo-link-batch-http
[link-http-website]:
https://www.npmjs.com/package/apollo-link-http
[link-error-website]:
https://www.apollographql.com/docs/apollo-server/data/errors/#gatsby-focus-wrapper
