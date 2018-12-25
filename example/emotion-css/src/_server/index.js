import initServer from "@treats/server";
import { renderStylesToString } from "emotion-server";

const app = initServer({
    customRenderers: [renderStylesToString]
});

export default app;
