---
id: code-splitting
title: Code-splitting
sidebar_label: Code-splitting
---

The basic concept of code-splitting is to split single big bundle of our app into separate small chunks that can be loaded on demand. Code-splitting can be done on route level or even component level. Setting up code-splitting for modern JavaScript web apps was notoriously known to be a painful process. Let alone make it work with Hot Module Replacement on development build. 

To solve this problem we will use 2 main building blocks of code-splitting in Treats, the `AsyncLoader` and `AsyncComponent`, in the future, we might not need 2 separate components to do code-splitting, but for now we found out that this is the less painful way to do code-splitting while keeping the HMR capabilities on development mode.

## AsyncLoader and AsyncComponent
`AsyncLoader` that was build on top of [react-universal-component][react-universal-component] act as the code-splitting entry for our async bundle:

```js
// page/home/index.js
import AsyncLoader from "@treats/component/async-loader";

const Home = AsyncLoader({ component: import("./home") });

export default Home;
```

`AsyncComponent` that was build on top of [react-hot-loader][react-hot-loader] act as the hot-module-replacement enabler for our async bundler
```js
// page/home/home.js
import AsyncComponent from "@treats/component/async-component";

const Home = () => <div>Home!<div/>;

export default AsyncComponent(module, Home);
```
More information about how to customize loading, error placeholder etc for `AsyncLoader` can be found [here][api-reference-component-async-loader]

[react-universal-component]: https://github.com/faceyspacey/react-universal-component
[react-hot-loader]: https://github.com/gaearon/react-hot-loader
[api-reference-component-async-loader]: ../api-reference/component.html#asyncloader
