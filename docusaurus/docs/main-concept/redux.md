---
id: redux
title: Redux
sidebar_label: Redux
---

[Redux][redux-website] is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

## Customizing Redux Implementation
There's 2 filesystem hooks under `src/_redux` directory that can be used to configure Redux implementation for Treats:
1. `middleware.js` - This file will be used to register user's Redux middleware, accepts arrays of middlewares or single middleware.

```js
// src/_redux/middleware.js
import thunk from "redux-thunk";

export default thunk;
```

2. `reducer.js` - This file will be used to register user's root reducer.

```js
// src/_redux/reducer.js
import { combineReducers } from "@treats/redux";
import HomeReducer from "./home";
import AboutReducer from "./about";

export default combineReducers({
    home: HomeReducer,
    about: AboutReducer
});
```

More reference about these filesystem hooks can be found [here][api-reference-filesystem-hooks-redux]

## Using Redux
To use our redux setup we can just simply `connect` our component by using `react-redux`'s `connect` HOC that you could import from `@treats/redux`:

```js
// src/page/my-page/my-page.js
import React, { Component } from "react";
import { connect } from "@treats/redux";
import myAction from "../redux/my-action";

class MyPage extends Component {
    componentDidMount() {
        const { status, onComponentMount, someParameters } = this.props;
        if(status === "loading") {
            onComponentMount(someParameters);
        }
    }
    ...
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
    onComponentMount: someParameters => {
        dispatch(myAction.componentMount(someParameters));
    }
});

export default AsyncComponent(module, connect(mapStateToProps, mapDispatchToProps)(MyPage));
```

## Disable Redux
To disable redux and removes it from your build, you can set build config for redux on `treats.config.js` to **false**:
```js
// treats.config.js

module.exports = {
    ...,
    build: {
        redux: false
    },
    ...
}

```

Please note that with the above configuration, all redux related filesystem hooks wouldn't have any effect and you'll need to explicitly enable Redux again from build config to start using them again.

More info about `treats.config.js` can be found on [build config][build-config] section.

[redux-website]: https://redux.js.org/
[build-config]: build-config.html
[api-reference-filesystem-hooks-redux]: ../api-reference/filesystem-hooks.html#redux-middlewarejs
