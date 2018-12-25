---
id: middleware
title: Middlewares
sidebar_label: Middlewares
---

In this section, we'll learn to create a middleware addon for Treats. Middleware are also modelled as object with `middleware` method that will always be triggered on response/request cycle. We used object instead of simple function to encapsulate other side-effect methods that might be needed by the middleware function, for example, we might need to separate data-fetching function into separate methods.

In the previous section, we've finished building a simple helper that returns `fizz` or `buzz` by turns in the previous example. We'll continue to use the same project to build our middleware now.

We'll build a simple middleware that triggers our helper and prints out `foo` if current state of our helper is `fizz`, and `bar` if it is the opposite.

To start building our middleware, let's first create the directory and middleware file:

```
src/
|-- middleware/
    |-- foobar/
        |-- index.js
```

Just like with helper, we'll start creating our middleware by defining a simple object:

```
// src/middleware/foobar/index.js

// 👇 start by creating plain object for now
const FooBarMiddleware = {

};

export default FooBarMiddleware;
```

Valid middleware would have to implement `middleware` method that would be called on each response/request cycle.

```
// src/middleware/foobar/index.js
const FooBarMiddleware = {
     /* 👇 this is our middleware method that would be called on each response/request cycle
     middleware method can be async or normal function. */
    async middleware(req, res, next) {
        const { app } = req,
            fizzBuzzHelper = app.get("fizzbuzz"),
            fizzBuzzMessage = fizzBuzzHelper.print();
        let message = "foo";

        if(fizzBuzzMessage === "buzz") {
            message = "bar"
        }

        console.info(`FOOBAR MIDDLEWARE: ${message}`);
        next(); // 👈 don't forget to call the next function so request would be continued to the next middleware in line
    }
};

export default FooBarMiddleware;
```

Now let's test our middleware from our main app. To use our middleware, we would need to import and attach it to our Treats custom server:

```
// src/_server/index.js
import initServer, { EVENT_TYPES } from "@treats/server";
import FizzBuzzHelper from "../helper/fizzbuzz";
import FooBarMiddleware from "../middleware/foobar";

const app = initServer({
    customHelpers: FizzBuzzHelper,
    customMiddlewares: FooBarMiddleware,
    ...
});

export default app;
```

Now when you run your Treats app, when it receives a request it would print your message from the middleware.

Just like helper, middleware can also have `init` method that would be triggered on main app initialized. For example:

```
// src/middleware/foobar/index.js
const FooBarMiddleware = {
    init(app) {
        console.info("[Foobar] Middleware Initialized");
    },
    async middleware(req, res, next) {
        ...
    }
};

export default FooBarMiddleware;
```

Middleware can also triggers custom events:

```
// src/middleware/foobar/index.js
const FooBarMiddleware = {
    init(app) {
        console.info("[Foobar] Middleware Initialized");
    },
    async middleware(req, res, next) {
        const { app } = req,
            fizzBuzzHelper = app.get("fizzbuzz"),
            fizzBuzzMessage = fizzBuzzHelper.print();
        let message = "foo";

        if(fizzBuzzMessage === "buzz") {
            message = "bar"
        } else {
            const eventManager = app.get("eventManager");
            eventManager.fire("FOO_MESSAGE", req, res);
        }

        console.info(`FOOBAR MIDDLEWARE: ${message}`);
        next();
    }
};

export default FooBarMiddleware;
```

```
// src/_server/index.js
import initServer, { EVENT_TYPES } from "@treats/server";
import FizzBuzzHelper from "../helper/fizzbuzz";
import FooBarMiddleware from "../middleware/foobar";

const app = initServer({
    customMiddlewares: FooBarMiddleware,
    customHelpers: FizzBuzzHelper,
    customEvents: {
        [EVENT_TYPES.BEFORE_RENDER]: (req, res) => {
            ...
        },
        "BUZZ_MESSAGE": count => {
            ...
        },
        "FOO_MESSAGE": (req,res) => {
            console.info("BAR MESSAGE EVENT!");
        }
    }
});

export default app;
```

Congratulations! You've successfully created a simple middleware addon for Treats. In the next section, we'll look at how we can create a code generator template.
