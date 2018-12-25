const FizzBuzzHelper = {
    count: undefined,
    app: undefined,
    init(app) {
        if (app) {
            this.app = app;
            this.count = 0;
            app.set("fizzbuzz", this);
            console.info("[FizzBuzz] Helper Initialized");
            return true;
        }
        return false;
    },
    destroy() {
        if (this.app) {
            this.app.set("fizzbuzz", undefined);
            this.app = undefined;
            console.info("[FizzBuzz] Helper Destroyed");
            return true;
        }
        return false;
    },
    print() {
        let message = "fizz";
        if (this.count % 2 !== 0) {
            const eventManager = this.app.get("eventManager");
            message = "buzz";
            eventManager.fire("BUZZ_MESSAGE", this.count);
        }
        this.count += 1;
        console.info(`Message from FizzBuzzHelper: ${message}`);
        return message;
    }
};

export default FizzBuzzHelper;
