---
id: helper
title: Helpers
sidebar_label: Helpers
---

Helpers act as [sidecars][sidecar-website] instance for our server apps. Helpers main responsibility are to provide additional functionalities that can be used from our main app, for example: Redis client, etc. Helpers should have reference to the parent app and vice-versa. By default, this reference would be set using `init` method of the helper object. Example of a helper code:

```js
const configHelper = {
    // reference to server app
    app: undefined,
    configObj: undefined,
    // init method to link up app references
    init(app, envVars) {
        const { configDir } = envVars;
        ...
        // set reference between helper and server app
        this.configObj = config;
        this.app = app;
        app.set("config", this);
        ...
        return true;
    },
    get(key) {
        // helper method that can be called later on
        ...
        return configObj[key];
    }
};

export default configHelper;
```

These helpers can then be called later on, for example from middleware function:

```js
// middleware/example/index.js
const exampleMiddleware = {
    middleware(req, res, next) {
        if (!req.error) {
            // Getting some config from config helper
            const { app } = req,
                appConfig = app.get("config"),
                exampleConfig = appConfig.get("example");
            ...
            // calling middleware's next function so it would move on to next middleware
            next();
    }
};

export default exampleMiddleware;
```

## Custom Helpers Initialization
To initialize custom helpers, you'll need to provide custom server app by registering it through `_server/index.js` filesystem hooks. We provided server initialization wrapper functions that can be imported from `@treats/server`:

```js
import initServer from "@treats/server";
import { customHelperA } from "@treats/addons-example";

//register custom helpers
const app = initServer({
    customHelpers: customHelperA
});

export default app;
```


Registering multiple helpers:
```js
import initServer from "@treats/server";
import { customHelperA, customHelperB } from "@treats/addons-example";

//register custom helpers, use array for multiple helpers
const app = initServer({
    customHelpers: [customHelperA, customHelperB]
});

export default app;
```

Using function to register helpers:
```js
import initServer from "@treats/server";
import { customHelperA, customHelperB } from "@treats/addons-example";

//register custom helpers with functions
const app = initServer({
    customHelpers: (serverApp, envVars) => {
        customHelperA.init(serverApp, envVars);
        customHelperB.init(serverApp, envVars);
    }
});

export default app;
```

[sidecar-website]: https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar
