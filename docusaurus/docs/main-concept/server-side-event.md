---
id: server-side-event
title: Server-side Events
sidebar_label: Server-side Events
---

Server-side events can be used for example to send tracking or monitoring metrics, etc. Events can be registered by providing custom server app through `_server/index.js` filesystem hooks. Here's an example of tracking default render events with [datadog][datadog-website].

```js
import initServer, { EVENT_TYPES } from "@treats/server";
import datadogHelper from "@treats/addons-base/helper/datadog";

const app = initServer({
    // register datadog helpers t be used later on
    customHelpers: datadogHelper,
    // register custom events
    customEvents: {
        [EVENT_TYPES.BEFORE_RENDER]: (req, res) => {
            req.ddogTimer = {
                beforeRender: new Date().getTime()
            };
        },
        [EVENT_TYPES.AFTER_RENDER]: (req, res) => {
            req.ddogTimer.afterRender = new Date().getTime();

            const { app } = req,
                ddogClient = app.get("datadog"),
                renderTime = req.ddogTimer.afterRender - req.ddogTimer.beforeRender;

            ddogClient.histogram("process_time", renderTime, [`mylabel`]);
        },
        [EVENT_TYPES.ERROR_RENDER]: (req, res) => {
            const { app } = req,
                ddogClient = app.get("datadog");

            ddogClient.increment("error_count");
        }
    }
})
```

By default, Treats provided several events that can be imported from `@treats/server`:

1. `BEFORE_RENDER` - Events that would be triggered before React rendering happens.
2. `AFTER_RENDER` - Events that would be triggered after React rendering success and markup is ready to be sent.
3. `ERROR_RENDER` - Events that would be triggered when React rendering errors occured.
4. `LOCALE_MIDDLEWARE@no_locale` - Events that would be called when locale middleware found no existing locale from cookie and didn't find `lang` in query string either.

## Providing Custom Event hooks
Middlewares or helpers can provides their own custom event hooks. Users can then register their events by declaring it on custom server app. Below are example of how this interaction might happens:

```js
// @treats/addons-example/middleware/example/index.js
const exampleMiddleware = {
    middleware(req, res, next) {
        // get event manager from app
        const { app } = req,
        eventManager = app.get("eventManager");

        // trigger event via event manager        
        eventManager.fire("example_event", req, res, optional_params1, optional_params2);
        ...

        // calling middleware's next function so it would move on to next middleware
        next();
    }
};

export default exampleMiddleware;
```

In your custom server app:
```js
// src/_server/index.js
import initServer from "@treats/server";
import exampleMiddleware from "@treats/addons-example/middleware/example";

const app = initServer({
    // register the middleware
    customMiddleware: exampleMiddleware,
    // provides custom event for the middleware
    customEvents: {
        "example_event": (req, res, additional_param1, additional_param2) => {
            // do things with the event
            ....
        }
    }
});

export default app;
```

[datadog-website]: https://www.datadoghq.com/
