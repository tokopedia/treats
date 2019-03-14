---
id: environment-variable
title: Environment Variables
sidebar_label: Environment Variables
---

Treats Server can receive several environment variables:
1. `TREATS_PORT` - To specify which port our server will be ran, defaults to `3000`.
2. `TREATS_LOG_LEVEL` - To specify log level according to npm logging level, defaults to `info` in non-development mode or `silly` on development mode. The followings are available:
``` 
  error, 
  warn, 
  info, 
  verbose, 
  debug, 
  silly
```
3. `TREATS_CONFIG_DIR` - To specify runtime config file path, Defaults to `<PROJECT_ROOT_DIR>/treats.runtime-config.json/`. If file is non-existant then runtime config won't be initialized.

All environment variables will be available in `process.env.**` object in our code. There's also several build environment variables that we can use if for example we want our code to only exists in specific build target or build environment.
1. `NODE_ENV` - To check which environment are our build currently targetting. Environment can be specified using `env` flag on `treats build` CLI, for example:

```sh
treats build --env production

OR

treats build --env staging
```

2. `BUILD_TARGET` - To check which build target our code is currently built for, there's 2 build target that is currently available: `server` for server-side bundle and `client` for your browser bundle.
 
So if we want our code to specifically run only in browser we can do this:
```js
if(process.env.BUILD_TARGET === "client") {
    const $ = require("jQuery");
}
```
