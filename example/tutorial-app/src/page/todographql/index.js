/* index.js */

import AsyncLoader from "@treats/component/async-loader";

const TodoGraphqlPage = AsyncLoader({ component: import("./todographql") });

export default TodoGraphqlPage;
