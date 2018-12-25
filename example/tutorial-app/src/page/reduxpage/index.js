/* index.js */

import AsyncLoader from "@treats/component/async-loader";

const Reduxpage = AsyncLoader({ component: import("./reduxpage") });

export default Reduxpage;