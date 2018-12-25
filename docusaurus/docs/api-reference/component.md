---
id: component
title: Components
sidebar_label: Components
---

Treats exposes several React component that can be used as a helper to integrate your apps to Treats internal.

## AsyncComponent

`AsyncComponent` HOC is used together with `AsyncLoader` for connecting your code-splitted component to Treats main bundle, `AsyncComponent` wraps `react-hot-loader`'s `hot` HOC:

```
// src/components/my-component/my-component.js

import AsyncComponent from "@treats/component/async-component"

const MyComponent = () => <div/>

export default AsyncComponent(module, MyComponent)
```

**Parameters**:

-   `componentModule` **module** module global variable
-   `component` **React.Component** React component that will be code splitted

## AsyncLoader

`AsyncLoader` is used in conjunction with `AsyncComponent` it would act as dock for your code-splitted component, under the hood it wraps `react-universal-component`'s `universal` HOC:

```
// src/components/my-components/index.js
import AsyncLoader from "@treats/component/async-loader";

const MyComponent = AsyncLoader({ component: import("./my-component") });

export default MyComponent;
```

**Parameter**:

-   `props` **object** Props Object
-   `props.component` Webpack dynamic import declaration
-   `props.options` React Universal Component Options
-   `props.options.loading` **React.Component** React Component to be displayed while loading async bundle. Default: "loading...".
-   `props.options.error` **React.Component** React Component to be displayed on error loading async bundle. Default: "error".
-   `props.options.key` **'foo' || module => module.foo** Name of the export for the code-splitted component. Default: `default`.
-   `props.options.timeout` **number** Timeout time before error state triggered. Default: 15000
-   `props.options.onError` **(error, { isServer }) => handleError(error, isServer)** Callback that would be triggered on error.
-   `props.options.onLoad` **_(module, { isSync, isServer }, props, context) => do(module, isSync, isServer, props, context)_** Callback that would be triggered on finished loading async bundle.
-   `props.options.minDelay` **number** Minimum delay before your async component displayed, useful for when you want to always show loading component. Default 0
-   `props.options.alwaysDelay` **boolean** Toggle to set if minDelay is always used. Default: false
-   `props.options.loadingTransition` When set to `false` allows you to keep showing the current component when the loading component would otherwise show during transitions from one component to the next. Default: true
-   `props.options.render` Overrides the default rendering logic. This option enables some interesting and useful usage of this library.

For more information about `react-universal-component` behavior, you could see them on [their readme][react-universal-web]

## ErrorBoundary

A component that wraps [React's error boundary implementation][react-error-boundary] for easier integration with treats internal.

```
import ErrorBoundary from "@treats/component/error-boundary";
import MyErrorPlaceholder from "../components/my-error-placehodler";

const ComponentThatErrors = () => (
    <ErrorBoundary onError={err => console.log(err)} placeholder={MyErrorPlaceholder}>
        <div>This component would cause error</div>
    </ErrorBoundary>
)

export default ComponentThatErrors;
```

**Parameter**:

-   `props` **object** React props
-   `props.placeholder` **React.Component** React component to be used as placeholder if errors occured, received `Error` object from `error` props.
-   `props.onError` **Function** Event callback that would be triggered on error, received `Error` object as first parameter.

## HTTPStatus

A component that can be used to return HTTP Status alongside the component's HTML markup on server-side render.

```
// src/page/my-page.js

const MyPage = () => (
    <HTTPStatus status={404}>
        <div>Not Found</div>
    </HTTPStatus>
);

export default MyPage;
```

**Parameter**:

-   `props` **object** React props
-   `props.status` **number** HTTP status to be returned

## Link

A smart link component that can be used to determine if destination link can be reached via client-side routing or redirect, depends on route's existence in Treats routing object.

```
// src/page/welcome.js
import Link from "@treats/component/link";

const Welcome = () => (
    <div className="welcome">
        <Link href="/my-page">My Page</Link> // Let Treats determine if client-side routing or redirect
        <Link href="/my-page" isRedirect>My Page</Link> // always redirect
        <Link href="/my-page" isPush>My Page</Link> // Always client-side routing
    </div>
)

export default Welcome;
```

**Parameter**:

-   `props` **Object** React props
-   `props.href` **string** Destination path
-   `props.onClick` **Function** Event handler to be called when Link is clicked
-   `props.isPush` **boolean** Flag to force the routing strategy to always client-side routing
-   `props.isRedirect` **boolean** Flag to force the routing strategy to always redirect

## Redirect

A component to easily trigger redirection, server-side redirect along with status code in SSR, client-side routing or browser redirect on client-side.

```
// For example if we have a dashboard page that requires user to login:

// src/page/dashboard.js
import Redirect from "@treats/component/redirect";

const Dashboard = ({ isLogin }) => (
    <div>
        {!isLogin &&
            <Redirect to="/login" status={302}>
        }
        {isLogin &&
            <span>
                This is our dashboard
            </span>
        }
    </div>
);
```

**Parameter**:
- `props` **object** React props
- `props.from` **string** Redirect from
- `props.to` **string** Redirect to
- `props.status` **string** Redirect status code

## Provider

A component that wraps providers that is used by Treats internal, for example redux's `Provider`, apollo's `ApolloProvider` and react-intl's `IntlProvider`. Usually you won't need to deal with this component directly since it is already provided by Treats internally.

```
import { createStore } from "@treats/redux";
import Provider from "@treats/component/provider";

const store = createStore(...);

const MyPage = () => (
    <Provider reduxStore={store}>
        <div>My Page</div>
    </Provider>
);

export default MyPage;
```

**Parameter**:
- `props` **object** React props
- `props.reduxStore` **Redux Store** Redux Store
- `props.apolloClient` **Apollo Client** Apollo Client
- `props.intlProps` **object** Intl data
- `props.intlProps.locale` **string** Current language for the app.
 - `props.intlProps.message` **string** Translation messages.

[react-universal-web]: https://github.com/faceyspacey/react-universal-component
[react-error-boundary]: https://reactjs.org/docs/error-boundaries.html
