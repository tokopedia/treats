// src/_server/index.js
import initServer, { EVENT_TYPES } from "@treats/server";
import FizzBuzzHelper from "@treats/my-first-addons/helper/fizzbuzz";
import FooBarMiddleware from "@treats/my-first-addons/middleware/foobar";

const app = initServer({
    customMiddlewares: FooBarMiddleware,
    customHelpers: FizzBuzzHelper,
    customEvents: {
        [EVENT_TYPES.BEFORE_RENDER]: (req, res) => {
            const { app: appInstance } = req,
                FizzBuzzHelperInstance = appInstance.get("fizzbuzz"),
                message = FizzBuzzHelperInstance.print(req, res);
            console.info(`BEFORE_RENDER: ${message}`);
        },
        BUZZ_MESSAGE: count => {
            console.info(`BUZZ_MESSAGE EVENT: ${count}`);
        },
        FOO_MESSAGE: () => {
            console.info("FOO MESSAGE EVENT!");
        }
    }
});

export default app;
