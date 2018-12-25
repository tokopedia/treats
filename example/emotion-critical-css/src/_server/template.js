const templates = {
    default: ({
        helmet,
        cssTags,
        cssHash,
        reduxState,
        apolloState,
        reactMarkup: { html, css , ids },
        jsTags
    }) => `<!DOCTYPE html>
        <html ${helmet.htmlAttributes}>
        <head>
                ${helmet.title}
                ${helmet.meta}
                ${helmet.link}
                ${cssTags}
                ${cssHash}
                <script>
                    ${reduxState ? `window.__data=${reduxState};` : ""}
                    ${apolloState ? `window.__apollo=${apolloState};` : ""} 
                    ${ids ? `window.__EMOTION_IDS= ${ids};` : ""}
                </script>
                <style>
                    ${css}
                </style>
        </head>
        <body ${helmet.bodyAttributes}>
            <div id="treats-root">${html}</div>
            ${helmet.script}
            ${jsTags}
        </body>
        </html>`
};

export default templates;
