const templates = {
    default: ({
        helmet,
        cssTags,
        cssHash,
        reduxState,
        apolloState,
        reactMarkup: { html, css },
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
                </script>
                ${css}
        </head>
        <body ${helmet.bodyAttributes}>
            <div id="treats-root">${html}</div>
            ${helmet.script}
            ${jsTags}
        </body>
        </html>`
};

export default templates;
