import initClient from "@treats/client";
import { hydrate } from "emotion";

console.log(window.__EMOTION_IDS);
hydrate(window.__EMOTION_IDS);

const app = initClient();

export default app;
