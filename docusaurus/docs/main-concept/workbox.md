---
id: workbox
title: Treats with Workbox
sidebar_label: Workbox
---
Treats provides [Workbox][workbox-main-page] support in building your application. Workbox is a libary that makes caching assets on your application much easier so it can improve your application's performance and resilience in unstable condition.

Treats using a webpack plugin called [workbox-webpack-plugin][workbox-webpack-plugin-module-page] to implement Workbox. Workbox configuration can be set and enabled on your project from your project's treats build config (`treats.config.js`) as can be seen in here [build config][main-concept-build-config] file without needing to install and add any of workbox dependencies.

## Configuring Workbox inside Treats Build Config file
Here's an example on how to enable your workbox configuration on `treats.config.js`:
```
// treats.config.js
...
const config: {
    ...
    webpack: {
        ...
        workbox: {
            pluginMode: "InjectManifest",
            serviceWorkerFilename: "sw.js",
            options: {
                swSrc: "./src/sw.js",
                include: /\.(html|css|js)$/
            }
        }
    }
}

```
Your configuration should be placed inside `workbox` object inside of `webpack`'s config. There's several variable that can be inputted here:
- `pluginMode`: plugin classes that are provided by `workbox-webpack-plugin`. There's two plugins that can be used such as:
    - `GenerateSW`: Automatically generate a service worker.
    - `InjectManifest`: Injecting list of precached assets into a service worker file. If you're using this plugin, `swSrc` must be included in option.
- `serviceWorkerFilename`: The name of the service worker output file. Will be defaulted to `service-worker.js` if this variable left empty.
- `options`: Configuration options that to be added as the plugin's option in `workbox-webpack-plugin`. More info on what options that available to be  added can be found here.


[workbox-main-page]: https://developers.google.com/web/tools/workbox/
[workbox-webpack-plugin-module-page]: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
[main-concept-build-config]: ./build-config.html