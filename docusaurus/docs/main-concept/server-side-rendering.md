---
id: server-side-rendering
title: Server-side Rendering
sidebar_label: Server-side Rendering
---

What server-side rendering (SSR) do is basically rendering our React markup that's supposed to be only rendered on the client browser by our JavaScript bundle directly from our server. Our client-side bundle would then rehydrate our server-side rendered markup so it can be interactive later on.

There's several reason for why we want to server-side render our React app. First, server-side rendered web app are more crawler friendly, so it can then boost our SEO ranking better, especially for crawlers that didn't run JavaScript. Second, our initial page load would be faster, since users can immediately see informations on our site, and when our JavaScript bundle finally arrives, it would just need to rehydrate our server-side rendered markup instead of regenerating all the DOM element again.

Creating server-side rendered React web apps are known to be very painful process since you need to configure lots of things from the server, data loading process, etc. But fret' not, since Treats are designed to supports SSR by default, we can just add few adjustments to our pages component and let Treats handle the rest.

To implement SSR in Treats, we can just provide `getInitialState` static method for our page component. The `getInitialState` method would then receives router and server context object that could be used as sources for any data fetching or state adjustment that you may want to make from our server-side actions. For example:

```js
// src/pages/my-page/my-page.js
import React, { Component } from "react";
import myAction from "../redux/my-action";

class MyPage extends Component {
    ....
    static async getInitialState({ router, serverContext}) {
        const { req, reduxStore } = serverContext;
        return reduxStore.dispatch(myAction.serverSideRender(req));
    }
    render() {
        const { status, myData } = this.props;
        return (
            <div>
                {status === "loading" && <span>Loading....</span>}
                {status === "done" && myData && myData.length > 0 && <div>
                    {myData.map(datum => {
                        <RENDER SOMETHING WITH THE DATA>
                    })}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    status: state.status,
    myData: state.myData
});

const mapDispatchToProps = dispatch => ({
    ...
});

export default AsyncComponent(module, connect(mapStateToProps, mapDispatchToProps)(MyPage));
```

To define `getInitialState` from functional component:

```js
// src/pages/my-page/my-page.js
import React, { Component } from "react";
import myAction from "../redux/my-action";

const MyPage = ({ status, myData }) => (
    <div>
        {status === "loading" && <span>Loading....</span>}
        {status === "done" && myData && myData.length > 0 && <div>
            {myData.map(datum => {
                <RENDER SOMETHING WITH THE DATA>
            })}
        </div>}
    </div>
);

MyPage.getInitialState = async ({ router, serverContext}) => {
    const { req, reduxStore } = serverContext;
    return reduxStore.dispatch(myAction.serverSideRender(req));
};

const mapStateToProps = async (state) => ({
    status: state.status,
    myData: state.myData
});

const mapDispatchToProps = dispatch => ({
    ...
});

export default AsyncComponent(module, connect(mapStateToProps, mapDispatchToProps)(MyPage));
```

And don't forget to register our page in the router definition like so:

```js
// src/_route/module.js

export default [{
    name: "my-page",
    path: "/my-page"
}]
```

```js
// src/_route/route.js

import MyPage from "../page/my-page"

export default {
    "/my-page": MyPage
};
```

## Router and Server Context Object
Router and server context object would always be passed on our page's `getInitialState` method, these object can then be used to determine what action would be made to render our React app on the server:
1. `router` object contains current matched route for this component. This is basically the compiled version of our route definition, for the example above, the router object would be:
```js
{
    name: "my-page",
    path: "/my-page",
    component: MyPage
}
```

2. `serverContext` object contains `req`, `res`, `reduxStore`, and `apolloClient`:

    - `req` **object** express request object.
    - `res` **object** express response object.
    - `reduxStore` **Redux Store** redux store that is specifically created for current request.
    - `apolloClient` **Apollo Client** Apollo GraphQL client that is specifically created for the current request.
