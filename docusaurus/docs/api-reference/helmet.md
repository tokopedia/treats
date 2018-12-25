---
id: helmet
title: Helmet
sidebar_label: Helmet
---

Treats wraps `react-helmet` with `@treats/helmet` alias, it is recommended to import from `@treats/helmet` instead of `react-helmet` directly because in the future, there might be improvements or patches that Treats made. Full documentation about `react-helmet` can be found [here][react-helmet-wiki]

```
// src/page/my-page.js

import { Helmet } from "@treats/helmet";

const MyPage = () => (
    <div>
        <Helmet>
            <title>My Page Title</title>
        </Helmet>
    </div>
);

export default MyPage;
```

[react-helmet-wiki]: https://github.com/nfl/react-helmet
