---
id: client
title: Client
sidebar_label: Client
---

Treats also exposes `initClient` wrapper function to customize client app.

## InitClient

A simple wrapper function that can be used as a helper to customize your client instance, this wrapper function can be imported from `@treats/client`.

```
// src/_client/index.js
import initClient from "@treats/client";

const app = initClient();

export default app;
```

**Parameter**

-   `config` **object** Client configuration object
-   `config.reduxState` **Redux State** Redux state that would be used to rehydrate client's Redux store.
-   `config.apolloState` **Apollo State** Apollo State that would be used to rehydrate Apollo in-memory cache on the client-side.
-   `config.lang` **string** Current language of the app.
-   `config.rootDiv` **string** The ID of the root div where your React app should be injected.
-   `config.appProps` **object** Other props that you'll want to pass to your React app.
