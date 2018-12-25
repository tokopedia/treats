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
