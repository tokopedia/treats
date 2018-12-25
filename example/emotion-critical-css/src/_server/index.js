import initServer from "@treats/server";
import { extractCritical } from "emotion-server";

const app = initServer({
    customRenderers: [extractCritical]
});

export default app;
