import initClient from "@treats/client";
import { hydrate } from "emotion";

hydrate(window.__EMOTION_IDS);

const app = initClient();

export default app;
