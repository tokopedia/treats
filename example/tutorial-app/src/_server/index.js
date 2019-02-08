import initServer from "@treats/server";
import CircuitBreaker from "@treats/addons-base/helper/circuitbreaker";

const app = initServer({
    customHelpers: CircuitBreaker
});

export default app;
