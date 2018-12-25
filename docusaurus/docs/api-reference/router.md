---
id: router
title: Router
sidebar_label: Router
---

Treats abstracts away `react-router-dom` with `@treats/router` alias, it is recommended to import from `@treats/router` instead of `react-router-dom` directly because in the future, there might be improvements or patches that Treats made. Full documentation about `react-router-dom` can be found [here][react-router-dom-wiki]

```
// src/page/my-page.js

import { Switch, Router } from "@treats/router";

const MyPage = () => (
    <Switch>
        <Router />
        ...
    </Switch>
)

export default MyPage;
```

[react-router-dom-wiki]: https://reacttraining.com/react-router/web/guides
