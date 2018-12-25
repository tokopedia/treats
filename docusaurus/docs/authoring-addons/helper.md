---
id: helper
title: Helpers
sidebar_label: Helpers
---

In this section, we will look at how we can author a simple helper. A helper acts as a [sidecar][sidecar-website] that is attached to our main app and will provide additional functionalities that can be used from our main app.

For our project, we'll build a simple helper that when its `print` method triggered, it would print either `fizz` or `buzz` on each request by turns.

First, let's create our directory and helper file inside:

```
src/
|-- helper/
    |-- fizzbuzz/
        |-- index.js
```

After that, let's start creating our helper object:

```
// src/helper/fizzbuzz/index.js

// 👇 start by creating plain object for now
const FizzBuzzHelper = {

};

export default FizzBuzzHelper;
```

Remember that an helper are sidecars that should be attached to our main app, let's do that now:

```
// src/helper/fizzbuzz/index.js

const FizzBuzzHelper = {
    count: undefined,  // 👈 our count that would be incremented later when print method triggered.
    app: undefined,  // 👈 save a reference to our main app so it would be easier to access it later on.
    init(app) { // 👈 this is our initialization method that would be called on our main app start.
        if(app) {
            this.app = app;
            this.count = 0;
            app.set("fizzbuzz", this);
            console.info("[FizzBuzz] Helper Initialized");
            return true;
        }
        return false;
    },
    destroy() { // 👈 this is our destroy method that would be called when our main app stopped
        if(this.app) {
            this.app.set("fizzbuzz", undefined);
            this.app = undefined;
            console.info("[FizzBuzz] Helper Destroyed");
            return true;
        }
        return false;
    }
}

export default FizzBuzzHelper;
```

There's several things going on here:

-   First, we have `count` property for our helper to save the count state of our helper, this state could then be used to later determine if we want to print either `fizz` or `buzz`. We also created `app` property to save our reference to Treats main server app that would use this helper.
-   Second, we created our `init` method. Init method would automatically called by a Treats main server app that uses our helper when the app started, we then initialize our `count` and `app` property here. In more complex scenario, you might want to initialize other things that your helper would be dependent to through the whole lifecycle of your helper.
-   Third, we also created our `destroy` method, this method would be triggered when Treats main app exited, there we remove all states and references for cleaner codes. In more complex scenario, we could remove all instances that had been initialized when your helper `init` method triggered.

Next, let's implement our `print` method:

```
// src/helper/fizzbuzz/index.js

const FizzBuzzHelper = {
    ...
    print() {
        let message = "fizz"
        if(this.count % 2 !== 0) {
            message = "buzz";
        }
        this.count += 1;
        console.info(`Message from FizzBuzzHelper: ${message}`);
        return message;
    }
}

export default FizzBuzzHelper;
```

All's set! now, let's test our helper from our main app. To use our helper, we would need to create a new Treats custom server app by providing `src/_server/index.js` file. Let's do that now, first create the file and folder needed:

```
src/
|-- _server/
    |-- index.js
```

Next, we'll create our custom server app and register our own helper there.

```
// src/_server/index.js
import initServer from "@treats/server";
import FizzBuzzHelper from "../helper/fizzbuzz";

const app = initServer({
    customHelpers: FizzBuzzHelper
});

export default app;
```

Now when you run your Treats app, it would print something like this:

```
[FizzBuzz] Helper Initialized
```

We've finished setting up and attaching our helper to the main app, but we haven't really do anything with our helper, we want to trigger our `print` method to actually do something with our helper. Let's do that with a [server-side event][main-concept-server-side-event], we'll print our message on `BEFORE_RENDER` event:

```
// src/_server/index.js
import initServer, { EVENT_TYPES } from "@treats/server";
import FizzBuzzHelper from "../helper/fizzbuzz";

const app = initServer({
    customHelpers: FizzBuzzHelper,
    customEvents: {
        [EVENT_TYPES.BEFORE_RENDER]: (req, res) => {
            const { app } = req,
                FizzBuzzHelperInstance = app.get("fizzbuzz"),
                message = FizzBuzzHelperInstance.print();
            console.info(`BEFORE_RENDER: ${message}`);
        }
    }
});

export default app;
```

Now when we send a new request to our server, before our page rendered, we'll see the message printed in our console.

What if we want to have an event triggered when `print` method is called, let's say we want to also print out the current count of our `fizzbuzzHelper` when our helper prints out `buzz`? Let's create that!

In our helper file, we'll add an event hook that we could use on our custom app events. we'll name this event as `BUZZ_MESSAGE`:

```
// src/helper/fizzbuzz/index.js

const FizzBuzzHelper = {
    ...
    print() {
        let message = "fizz"
        if(this.count % 2 !== 0) {
            const eventManager = this.app.get("eventManager");
            message = "buzz";
            eventManager.fire("BUZZ_MESSAGE", count);
        }
        this.count += 1;
        console.info(`Message from FizzBuzzHelper: ${message}`);
        return message;
    }
}

export default FizzBuzzHelper;
```

Now, let's add a custom event entry on our server app:
```
// src/_server/index.js
import initServer, { EVENT_TYPES } from "@treats/server";
import FizzBuzzHelper from "../helper/fizzbuzz";

const app = initServer({
    customHelpers: FizzBuzzHelper,
    customEvents: {
        [EVENT_TYPES.BEFORE_RENDER]: (req, res) => {
            ...
        },
        "BUZZ_MESSAGE": count => {
            console.info(`BUZZ_MESSAGE EVENT: ${count}`);
        }
    }
});

export default app;
```

Now when we send a new request to our server app, we'll also see the `BUZZ_MESSAGE` event being triggered.

Well done! You've just created a simple helper addon for Treats. In the next section, we'll learn how to create a middleware.

[sidecar-website]: https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar
[main-concept-server-side-event]: ../main-concept/server-side-event.html
