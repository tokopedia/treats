---
id: intl
title: Intl
sidebar_label: Intl
---

Treats abstracts away `react-intl` with `@treats/intl` alias, it is recommended to import from `@treats/intl` instead of `react-intl` directly because in the future, there might be improvements or patches that Treats made. Full documentation about `react-intl` can be found [here][react-intl-wiki]

```
// src/page/my-page.js

import { FormattedMessage } from "@treats/intl";

const MyPage = () => (
    <FormattedMessage id="my-message" />
)

export default MyPage;
```

[react-intl-wiki]: https://github.com/yahoo/react-intl/wiki
