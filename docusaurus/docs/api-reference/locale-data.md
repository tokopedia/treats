---
id: locale-data
title: Locale Data
sidebar_label: Locale Data
---

Treats wraps `react-intl`'s locale data with `@treats/locale-data` alias, it is recommended to import from `@treats/locale-data` instead of `react-intl/locale-data` directly because in the future, there might be improvements or patches that Treats made.

```
import id from "@treats/locale-data/id";
import en from "@treats/locale-data/en";
import { addLocaleData } from "@treats/intl";

addLocaleData([...id, ...en]);
```
