---
id: server-side-template
title: Server-side Template
sidebar_label: Server-side Template
---

Server side template would be useful if, for example you need html elements that is static or can't be included on your React app. Server-side template can be defined by using `src/_server/template.js`. Templates are defined as function that receives `renderParams` (or `error` object on `_error` template) [`req`][express-req-website], and [`res`][express-res-website] objects. It would then need to returns string that would be sent to requester's browser.

```js
// src/_server/template.js
const templates = {
    myTemplate: renderParams => {
        const {
            helmet,
            cssTags,
            cssHash,
            reduxState,
            apolloState,
            reactMarkup,
            jsTags
        } = renderParams;

        return `<!DOCTYPE html>
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
        </head>
        <body ${helmet.bodyAttributes}>
            <div id="treats-root">${reactMarkup}</div>
            ${helmet.script}
            ${jsTags}
        </body>
        </html>`;
    }
};

export default templates;
```

## Using Templates
To use our defined templates, we need to register it on our routes definition:
```js
// src/_route/route.js
export default [
    {
        path: "/my-page",
        template: "myTemplate",  
    }
];
```

Now when serving `/my-page` route, `myTemplate` would be used instead of `default` template.

## Special Templates
There's several template file that could be considered as special:
1. `default` - This template would be used when no template are defined on your route definition.
2. `_error` - This template would be used to display error pages.
3. `_notfound` - This template would be used to display not found pages.

## Render Params
There's several render params that is provided by Treats React Renderer by default:
1. `helmet` - This object are [helmet][helmet-website] instance that is extracted from your React app.
2. `reactMarkup` - This string represents your react app as markup.
3. `jsTags` -  This string represents `<script />` tags that needs to be loaded on this route.
4. `cssTags` -  This string represents `<link rel="css" />` tags that needs to be loaded on this route.
5. `cssHash` -  This string returns maps of CSS hash that your app has. 
6. `reduxState` - This string returns serialized Redux state that would be used to rehydrate browser's Redux state.
7. `apolloState` - This string returns serialized Apollo state that would be used to rehydrate Apollo in-memory-cache on the browser.


[helmet-website]: https://github.com/nfl/react-helmet
[express-req-website]: https://expressjs.com/en/api.html#req
[express-res-website]: https://expressjs.com/en/api.html#res
