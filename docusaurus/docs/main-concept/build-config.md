---
id: build-config
title: Build Config
sidebar_label: Build Config
---

Treats Build config are used to configure Treats at compile & bundle time, you can supply these configuration by providing `treats.config.js` on your project directory. If you use `create-treats-app`, the default had already been configured for you:
```js
//treats.config.js
const path = require("path");

const config = {
    app: {
        name: "my-treats-app",
        slug: "my-treats-app"
    },
    alias: {
        "@page": path.resolve(__dirname, "./src/page")
    }
};

module.exports = config;
```

There's several configuration that could be setup here:
- `app` - App meta related configuration, this config would be supplied to Treats generator when it is used.
    - `name` name of the app
    - `slug` of the app
- `alias` - You could register alias on your project here.
- `build` - This configuration would be used to configure your build
    - `graphql` - if value is `false` graphql client codes won't be included on your build.
    - `redux` - if value is `false` redux codes won't be included on your build.
- `webpack` - This configuration can be used to extends Treats webpack setup
    - `publicPath` - This value would override publicPath definition for your asset files.
    - `client` - This value would be merged to Treats client Webpack configuration using [webpack-merge][webpack-merge-website]
    - `server` - This value would be merged to Treats server Webpack configuration using [webpack-merge][webpack-merge-website]
    - `workbox` - This configuration can be used to enable and setting workbox configuration in treats. More info on workbox configuration can be seen on [here][workbox-build-configuration]
- `postcss` -This configuration can be used to extends Treats PostCSS setup
- `babel` -This configuration can be used to extends Treats Babel setup. All values would be merged to treats babel config using [babel-merge][babel-merge-website]


[webpack-merge-website]: https://www.npmjs.com/package/webpack-merge
[babel-merge-website]: https://www.npmjs.com/package/babel-merge
[workbox-build-configuration]: ./workbox.html
