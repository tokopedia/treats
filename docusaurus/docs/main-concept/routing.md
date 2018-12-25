---
id: routing
title: Routing
sidebar_label: Routing
---

Routing in Treats behaves isomorphically on client and server, this means your client-side routes will always be in sync with your server-side routes. With this implementation the same page can still be served when user refreshed your page as well as when user navigates to the url via client-side routing. 

## Customizing Your Routes
If you use [create-treats-app][cta] scripts, you'll notice that your Treats project had been created with preconfigured routing under `src/_route/` directory (if you didn't use create-treats-app you might want to check out our [API Reference][api-reference-routing]). Under `_route` directory, there'll be 2 files that you might want to checkout:
1. `route.js` - This file will be used to declare your routing strategy such as server-side template and client-side routing blocking, etc.
2. `module.js` - This file will be used to register your pages/top level components for given routes.

## Route configuration
Route configuraton can be defined on `route.js` file hooks. 

```js
export default [
    {
        path: "/my-page",
        exact: true,  
    },
    {
        path: "/page/:id",
        template: "custom-template"
    },
]
```

For routing, Treats uses [react-router-v4][react-router] under the hood, with additional configuration field that's specific to Treats use-case:
1. **path** - Any valid URL path that [path-to-regexp][path-to-regexp] understands.
2. **exact** - When **true**, will only match if the path matches the location.pathname exactly.
3. **strict** - When **true**, a path that has a trailing slash will only match a location.pathname with a trailing slash. This has no effect when there are additional URL segments in the location.pathname.
4. **sensitive** - When **true**, will match if the path is case sensitive.
5. **isPush** - When **false**, will block client-side routing and force page to reload.
6. **template** - Server-side template name to be used on this route.

More info about filesystem hook can be found [here][api-reference-route-routejs]

## Registering pages
Registering pages to certain routes can be done in `module.js` file. We'll only needs to map path to module on a single object an exports them.
```js
// src/_route/module.js
import MyPage from "@page/my-page";
import Page2 from "@page/page2";

export default {
    "/my-page": MyPage,
    "/page/:id": Page2
}
```

More info about filesystem hook can be found [here][api-reference-route-modulejs]

## Using Link Component
Client-side routing can be done with `<Link/>` component. For example:

```js
// page/home.js
import Link from "@treats/component/link";

export default () =>
    <div>
        Go to{" "}
        <Link href="/about">about</Link>
        to read more
    </div>
```

```js
// page/about.js
export default () => <div>About Section</div>    
```
With `<Link>` you don't have to worry about checking whether the destination path exists on your application or not, `<Link/>` will figure this out for you, if your destination path exists and client-side routing to that path is enabled, it'll automatically use client-side routing to get you there, otherwise, it'll redirect you to the destination page (browser will do full reload).

More options can be passed to `<Link/>` as props, more about this can be found [here][api-reference-component-link]

## Using Redirect Component
At some point, you might want to redirect user to some other page when certain conditions are met, you can do this with `<Redirect/>` component.

```js
// page/home-login.js
import Redirect from "@treats/component/redirect";

const HomeLogin = ({ isLogin }) => (
    <div> 
        {!isLogin && (
            <Redirect to="/login" status={302} />
        )}
        {isLogin && (
            <span>Congrats, you've logged in!</span>
        )}
    </div>
)

```

`<Redirect/>` will try to use client-side routing on the client if possible, while on the server it'll behave like normal server-side redirection.

More options can be passed to `<Redirect/>` as props, more about this can be found [here][api-reference-component-redirect]


## Client-side routing resolution
Treats uses the following rules to resolve whether we should go to destination path via client-side-routing:
1. If destination path exists in the routing configuration.
2. If destination path config isPush is not set to **false**.
3. If server-side template name is same within current path and destination path.

[react-router]: https://reacttraining.com/react-router
[cta]: https://npmjs.com/package/create-treats-app
[api-reference-routing]: ../api-reference/filesystem-hooks.html#route-routejs
[api-reference-route-routejs]:
../api-reference/filesystem-hooks.html#route-routejs
[api-reference-route-modulejs]:
../api-reference/filesystem-hooks.html#route-modulejs
[api-reference-component-link]:
../api-reference/component.html#link
[api-reference-component-redirect]:
../api-reference/component.html#redirect
[path-to-regexp]: https://www.npmjs.com/package/path-to-regexp
