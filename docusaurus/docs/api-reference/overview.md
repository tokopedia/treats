---
id: overview
title: Overview
sidebar_label: Overview
---

Treats provides several APIs that exposes its own modules or its wrapped packages.

## Filesystem Hooks
Filesystem hooks let you inject codes to Treats internal easily. Filesystem hooks can be defined under `src/_**` directories. For example, to inject middleware into Treats redux store:
```
// src/_redux/middleware.js
import thunk from "redux-thunk";
import { logger } from "redux-logger";
export default [thunk, logger];
```

See [Filesystem Hooks API Reference][api-reference-filesystem-hooks] for more information.

## Treats Modules
Treats provides API that exposes its own modules, these modules are usually used to better integrate your codes with Treats internal:
1. `@treats/client` - Expose modules that helps you initialize/do client-side things. See [Client API Reference][api-reference-client] for more information.
2. `@treats/server` - Expose modules that help you initialize/do server-side things. See [Server API Reference][api-reference-server] for more information.
3. `@treats/component/*` - Expose components that helps integrate your codes better with Treats React internal. See [Components][api-reference-component] for more information.
5. `@treats/util/*` - Expose utils that Treats internally uses so you wouldn't need to implement these utilities again. See [Utils][api-reference-util] for more information.

## Wrapped Modules
Treats packs and wrap several packages to save you from setting up necessary packages like Redux, Apollo Client, Intl, etc and potential headache when Treats updated its dependencies. There's several packages that could be imported from Treats:
1. `@treats/graphql` - Wraps `react-apollo`. See [GraphQL API Reference][api-reference-graphql] for more information.
2. `@treats/redux` - Wraps `redux` and `react-redux`. See [Redux API Reference][api-reference-redux] for more information.
3. `@treats/helmet` - Wraps `react-helmet`. See [Helmer API Reference][api-reference-helmet] for more information.
4. `@treats/intl` - Wraps `react-intl`. See [Intl API Reference][api-reference-intl] for more information.
5. `@treats/locale-data` - Wraps `react-intl`'s locale data. To use these locale-data you could simply import `@treats/locale-data/<LANGUAGE_CODE>`.
4. `@treats/router` - Wraps `react-router-dom`. See [Router API Reference][api-reference-router] for more information.

[api-reference-filesystem-hooks]: ./filesystem-hooks.html
[api-reference-client]: ./client.html
[api-reference-server]: ./server.html
[api-reference-component]: ./component.html
[api-reference-util]: ./util.html
[api-reference-graphql]: ./graphql.html
[api-reference-redux]: ./redux.html
[api-reference-helmet]: ./helmet.html
[api-reference-intl]: ./intl.html
[api-reference-router]: ./router.html
