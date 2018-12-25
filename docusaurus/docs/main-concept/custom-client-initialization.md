---
id: custom-client-initialization
title: Custom Client Initialization
sidebar_label: Custom Client Initialization
---

You can also provide `src/_client/index.js` filesystem hooks, this file would act as the entry point for our client-side code. We provide a `initClient` wrapper function that could be imported from `@treats/client`.

```js
// src/_client/index.js
import initClient from "@treats/client";

const app = initClient();

export default app;
```

With custom client initialization we could manage how our client-side app will receive server supplied states and do any other global variable initialization that our client-side codes might need.

## Supplying Server States
Similar to `initServer` function, `initClient` could also be supplied a configuration object with the following fields:
1. `reduxState` - Used to supply Redux state that would be used to rehydrate client-side Redux store.
2. `apolloState` - Used to supply Apollo state that would be used to rehydrate client-side Apollo in-memory-cache.
3. `lang` - Used to supply language that the apps are currently initialized with.
4. `rootDiv` - Used to supply id of React root element.
5. `appProps` - Used to supply additional props that needs to be supplied to our React app.
