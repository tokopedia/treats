import AsyncLoader from "@treats/component/async-loader";

const Welcome = AsyncLoader({ component: import("./welcome") });

export default Welcome;
