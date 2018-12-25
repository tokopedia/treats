---
id: custom-server-app
title: Custom Server App
sidebar_label: Custom Server App
---

Custom server app can be defined by user through `src/_server/index.js` filesystem hooks. We provided a `initServer` wrapper function that could be imported from `@treats/server`.

```js
// src/_server/index.js
import initServer from "@treats/server";

const app = initServer();

export default app;
```
With custom server app we could register server addons like helpers, middlewares or events etc.

## Customizing server app
To customize server app, we could supply a configuration object to `initServer` wrapper function:
1. `customMiddlewares` - To register custom middlewares. See more on [middleware][middleware] section.
2. `customHelpers` - To register custom helpers. See more on [helper][helper] section.
3. `customEvents` - To register custom events. See more on [server-side event][server-side-event] section.

```js
// src/_server/index.js
import initServer from "@treats/server";
import { customMiddlewareA, customMiddlewareB } from "@treats/addons-example";

const app = initServer({
    customMiddlewares: [customMiddlewareA, customMiddlewareB]
});

export default app;
```

[middleware]: ./middleware.html
[helper]: ./helper.html
[server-side-event]: ./server-side-event.html
