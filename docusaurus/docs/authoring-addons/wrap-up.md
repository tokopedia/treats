---
id: wrap-up
title: Wrapping Up
sidebar_label: Wrapping Up
---

First, pat yourself in the back and crack open a bottle of champagne! You're just about to save fellow Treats users from reinventing the wheel!

Now we're ready for the most exciting part of it all, package and ship your addons into an npm package.

Let's start by initializing an empty npm repository:
```
~$ mkdir my-first-addons
~$ cd my-first-addons
~$ npm init
```

> When prompted, you can put `@treats/my-first-addons` or any other package as package name. With `@treats/` as prefix, you're initializing your package under `@treats` npm scoped module.

After your npm package had been initialized, let's create our working directories to match the following structure:
```
my-first-addons/
|  
|-- package.json
|-- generator/
|-- helper/
|-- middleware/
```

Now we've just need to copy all addons that we've built in previous sections to these folders so it would look like this:
```
my-first-addons/
|  
|-- package.json
|-- generator/
    |-- my-life
        |-- treats-generator.js
        |-- ${NAME}.md
|-- helper/
    |-- fizzbuzz/
        |-- index.js
|-- middleware/
    |-- foobar/
        |-- index.js
```

After that you can just push them to npm registry with:
```
npm publish
```

When you've finished publishing the addons, now you can finally install it in your Treats project with:
```
yarn add @treats/my-first-addons
```

Now you can replace your imports in `src/_server/index.js` like this:
```
import FizzBuzzHelper from "@treats/my-first-addons/helper/fizzbuzz";
import FooBarMiddleware from "@treats/my-first-addons/middleware/foobar";
```

To use your generator, now you can use:
```
yarn generate @treats/my-first-addons/generator/my-life
```

Nice work! We hope you've grasped the basic concept of how addons system works in Treats. We're always amazed by how people can collaborate and create cool addons that we didn't think of before, and can't wait to see yours too!
