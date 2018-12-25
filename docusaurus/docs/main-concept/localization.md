---
id: localization
title: Localization
sidebar_label: Localization
---

Treats comes preconfigured with painless localization support thanks to [react-intl][react-intl]
. On the client-side all locale data and translations are fully code splitted, so your apps would never fetch unnecessary language that your user never uses. By default, Treats provide English & Indonesian language options as locale, you might change, add, or remove language as you desired by providing [locale resolver][locale-resolver] for client-side locale resolving and [locale hook][locale-hook] for server-side locale import.

## Writing translations
Your custom translations can be defined by specifying `${language-code}.json` file under `src/_locale` directory. These translation files should be written using [FormatJS][formatjs] syntax. For example:

```js
// _locale/en.json
{
    "hello_world": "Hello World!",
    "welcome_user": "Welcome, {name}!"
}
```
```
// _locale/id.json
{
    "hello_world": "Halo Dunia!",
    "welcome_user": "Selamat Datang, {name}!"
}
```

These are the common useful FormatJS syntax to get you started:
```
//Simple Argument
Hello {name}!

// Number
I have {numCats, number} cats.
Almost {pctBlack, number, percent} of them are black.

// Date
Sale begins {start, date, medium}

// Time
Coupon expires at {expires, time, short}

// Select
{gender, select,
    male {He}
    female {She}
    other {They}
} will respond shortly.

// Plural
You have {itemCount, plural,
    =0 {no items}
    one {1 item}
    other {{itemCount} items}
}.

// Select Ordinal
It's my cat's {year, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
} birthday!
```

You might want to checkout [their syntax guide][formatjs-syntax] to learn more about this awesome i18n syntax.

These translation files can then be imported by our locale hook and locale resolver.

## Translate your app with treats/intl components
Treats/intl exports several useful react-intl components such as: `<FormattedMessage />`, `<FormattedDate />`, etc as well as `injectIntl` HOC to inject `intl` context to your component.

```js
// page/home.js
import { FormattedMessage, FormattedDate } from "@treats/intl";

export default ({ userName }) => {
    <div>
        <FormattedMessage id="hello_user" values={{
            name: userName
        }} />,
        {" "}Today is{" "}
        <FormattedDate value={new Date()} />
    </div>
}
```

More about Treats intl components can be found [here][api-reference-treats-intl]

## Locale Hook (Server-side)
> Please note that if you didn't need to change the available languages for your app from English & Indonesian then you can just leave this implementation to us.

To register your translation files on server-side, you need to define locale hook that will be imported by Treats with `src/_locale/index.js`. Since on the server-side all translations should be imported, this hook can just exports a simple object like so:

```js
import en from "./en.json";
import id from "./id.json";

export default {
    en,
    id
};
```

## Locale Resolver (Client-side)
> Please note that if you didn't need to change the available languages for your app from English & Indonesian then you can just leave this implementation to us.

Things got a little bit complex on client-side since you don't want to load every possible locale data when all your user needs was just one language, to solve this, we'll provide our own locale resolver function.

Your resolver function would receive a single argument, what language are currently active and it needs to return Promise with webpack dynamic import that imports both [treats locale data][api-reference-locale-data] and your translation file.

```js
// src/_locale/resolver.js
const resolver = lang => {
    switch (lang) {
        case "id":
            return Promise.all([
                import("@treats/locale-data/id"),
                import("./id.json")
            ]);
        case "en":
        default:
            return Promise.all([
                import("@treats/locale-data/en"),
                import("./en.json")
            ]);
    }
};

export default resolver;
```


[react-intl]: https://github.com/yahoo/react-intl
[locale-resolver]: #locale-resolver
[locale-hook]: #locale-hook
[formatjs]: https://formatjs.io
[formatjs-syntax]: https://formatjs.io/guides/message-syntax/
[api-reference-treats-intl]: ../api-reference/intl.html
[api-reference-locale-data]: ../api-reference/locale-data.html
