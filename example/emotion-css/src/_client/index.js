import initClient from "@treats/client";
import { sheet } from "emotion";

// disable emotion speedy to not interfere with hydrate process
sheet.speedy(false);

const app = initClient();

sheet.speedy(true);

export default app;
