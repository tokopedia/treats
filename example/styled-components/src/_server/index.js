import initServer from "@treats/server";

import { ServerStyleSheet } from 'styled-components'

const app = initServer({
    customRenderers: (reactApp, renderToString) => {
        const sheet = new ServerStyleSheet(),
            html = renderToString(sheet.collectStyles(reactApp)),
            css = sheet.getStyleTags();

        return {
            html,
            css
        };
    }
});

export default app;
