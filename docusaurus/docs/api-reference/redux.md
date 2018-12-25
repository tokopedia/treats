---
id: redux
title: Redux
sidebar_label: Redux
---

Treats wraps `react-redux` and `redux` together with `@treats/redux` alias (**with the exception of `Provider` component that could be imported under `@treats/component/Provider` see [Components][api-reference-component] section**. It is recommended to import from `@treats/redux` instead of `react-redux` or `redux` directly because in the future, there might be improvements or patches that Treats made. Full documentation about `react-redux` can be found [here][react-redux-wiki], Redux documentation can be found [here][redux-wiki].

```
import { connect } from "@treats/redux";

const MyPage = ({ username }) => (
    <div>Hello {username}</div>
);

const mapStateToProps = state => ({
    username: state.user.name
});

export default connect(mapStateToProps)(MyPage);
```

[api-reference-component]: ./component.html#Provider
[react-redux-wiki]: https://github.com/reduxjs/react-redux
[redux-wiki]: https://redux.js.org/
