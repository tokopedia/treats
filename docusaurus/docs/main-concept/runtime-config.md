---
id: runtime-config
title: Runtime Config
sidebar_label: Runtime Config
---

Runtime config can be specified for your server app. Runtime config can be handy to store configs that can be changed frequently so you didn't need to deploy everytime you want to change configs. Runtime configs are stored in JSON format, for example:

```js
// treats.runtime-config.json
{
    "locale": {
        "defaultLang": "id"
    },
    "helper": {
        "redis": {
            "my_redis": {
                "host": "my-redis",
                "port": "6379"
            }
        }
    }
}
```

Treats Server will look at `<PROJECT_DIRECTORY>/treats.runtime-config.json` by default for any runtime configs. If you need to change this behavior, you can supply `TREATS_CONFIG_DIR` environment variable, or if you use custom server app, you can pass `configDir` on `envVars` field on configuration object:

```js
// src/_server/index.js
import initServer from "@treats/server";

const app = initServer({
    envVars: {
        configDir: "/etc/my-app/config.json"
    }
});

export default app;
```
