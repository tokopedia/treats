---
id: middleware
title: Middlewares 
sidebar_label: Middlewares 
---

Middleware allows for the interjection of code in the request/response cycle. For example, we use locale middleware to determine current request's locale and preparing response according to it. Treats middleware object should have a method called `middleware` that behaves similarly like [express middleware][express-middleware-website]. We used object instead of simple function to encapsulate other side-effect methods that might be needed by the middleware function, for example, we might need to separate data-fetching function into separate methods. Example code of a middleware:

```js
// middleware/example/index.js  
const exampleMiddleware = {
    middleware(req, res, next) {
        // Check if request hadn't been errored
        if (!req.error) {
            // Getting some config from config helper
            const { app } = req,
                appConfig = app.get("config"),
                exampleConfig = appConfig.get("example"),
                somevalue = exampleConfig.value;

            // Set value to request object
            req.example = {
                value: somevalue
            };
            req.appProps = {
                ...req.appProps,
                language
            };
            req.renderParams = {
                ...req.renderParams,
                language
            };

        // calling middleware's next function so it would move on to next middleware
        next();
    }
};

export default exampleMiddleware;
```

## Request Object
[Request (req)][request-express] object flows between middlewares and ends in Treats React Renderer. There's several req properties that acts as interface between your middleware and Treats React Renderer:
1. `appProps` - This object would be passed down as your React apps props.
2. `renderParams` - This object would be passed down as parameter for your [Server-side template][server-side-template] generator function.
3. `reduxState` - This object holds redux state that would be used to hydrate redux's store.
4. `apolloHeader` - This object would be used to override apollo link headers, for example you might want to add `X-Forwarded-For` header to avoid rate-limiting.
5. `apolloState` - This object would be used to rehydrate apollo in-memory-cache on the server-side.

## Custom Middlewares Initialization
To initialize custom middlewares, you'll need to provide custom server app by registering it through `_server/index.js` filesystem hooks. We provided server initialization wrapper functions that can be imported from `@treats/server`:

```js
import initServer from "@treats/server";
import { customMiddlewareA } from "@treats/addons-example";

//register custom middleware
const app = initServer({
    customMiddlewares: customMiddlewareA
});

export default app;
```

Registering multiple middlewares (middleware order of execution would be following the order when it was defined on the array):
```js
import initServer from "@treats/server";
import { customMiddlewareA, customMiddlewareB } from "@treats/addons-example";

//register custom middleware
const app = initServer({
    customMiddlewares: [customMiddlewareA, customMiddlewareB]
});

export default app;
```

Using function to register custom middlewares:
```js
import initServer from "@treats/server";
import { customMiddlewareA, customMiddlewareB } from "@treats/addons-example";

//register custom middleware
const app = initServer({
    customMiddlewares: (serverApp, envVars) => {
        customMiddlewareA.init(serverApp, envVars);
        customMiddlewareB.init(serverApp, envVars);

        app.use(customMiddlewareA.middleware);
        app.use(customMiddlewareB.middleware);
    }
});

export default app;
```

[request-express]:https://expressjs.com/en/api.html#req
[express-middleware-website]: https://expressjs.com/en/guide/using-middleware.html
[server-side-template]: ./server-side-template.html
