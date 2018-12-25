---
id: server
title: Server
sidebar_label: Server
---

Treats exposes several utilites for creating and customizing server-side implementation of Treats internal. These utilities can be imported from `@treats/server`.

## InitServer

A simple wrapper function that can be used as a helper to customize your server instance, this wrapper function can be imported from `@treats/server`.

```
// src/_server/index.js
import initServer from "@treats/server";

const app = initServer();

export default app;
```

**Parameter**:

-   `config` **object** Server configuration object
-   `config.envVars` **object** Custom environment variables that would get injected into the app
-   `config.customMiddlewares` **Middleware | Middleware[] | (app, envVars) => {}** Custom middlewares that would be used by the server, accepts single middleware, array of middlewares, or a function that receives app instance and environment variables
-   `config.customHelpers` **Helper | Helper[] | (app, envVars) => {}** Custom helpers that would be used by the server, accepts single helper, array of helpers, or a function that receives app instance and environment variables
-   `config.customEvents` - **{ [string]: (req, res, ...args) => {} }** Custom events that gets triggered when its event name are called, event name are specified as the object's key.

## EVENT_TYPES

A set of event names that triggered by default by Treats Server:

1. `BEFORE_RENDER` - Triggered before Treats Server renders your React markup.
2. `AFTER_RENDER` - Triggered after Treats Server successfully renders your React markup.
3. `ERROR_RENDER` - Triggered when error happens while Treats Server renders your React markup.
4. `NO_LOCALE` - Triggered when no locale preferences found on user's request.

```
// src/_server/index.js
import initServer, { EVENT_TYPES } from "@treats/server";

const app = initServer({
    customEvents: {
        [EVENT_TYPES.BEFORE_RENDER]: (req, res) => {
            console.log("BEFORE RENDER EVENTS");
        },
        [EVENT_TYPES.ERROR_RENDER]: (req,res) => {
            console.log("ERROR RENDER EVENTS");
        }
    }
});

export default app;
```
