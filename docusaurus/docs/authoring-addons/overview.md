---
id: overview
title: Overview
sidebar_label: Overview
---

One powerful feature of Treats is that it can be easily customizable using your own or other people's code. To make your code easily accessible for other people to use, you can author an addon package to be used with Treats.

> PROTIP: We suggests you to put addon packages under `@treats` npm scoped module so other people can easily find them, but if you prefer to use your own naming convention, you can do that without any problem.

There's several addon types that you can use to customize Treats to suit your needs:
1. `Helper` - Helper is an instance that's responsible to provide additional functionalities that can be used from our main app. For more information about helpers, you can read more on our [Helper's Main Concept docs][main-concepts-helper]
2. `Middleware` - Middleware are function that allows for the interjection of code in the request/response cycle. For more information about middleware, you can read more on our [Middleware's Main Concept docs][main-concepts-middleware]
3. `Generator` - Code generator are provided for easier way to setup addons, build tools, etc.  For more information about middleware, you can read more on our [Generator's Main Concept docs][main-concepts-generator]

Within this section, we'll learn about how we could build each addons and package them into an npm package.

Let's start with creating a new Treats app:
```
~$ create-treats-app
~$ cd my-treats-app/
```

We'll use our newly created Treats app as testing ground for our addons. Inside your `src` folder, create `middleware`, `helper` and `generator` folder like so:

```
my-treats-app/
|-- src/
    |-- helper/
    |-- generator/
    |-- middleware/
```

Looking great so far! In the next section, we'll start creating our first addon, a helper!

[main-concepts-helper]: ../main-concept/helper.html
[main-concepts-middleware]:
../main-concept/middleware.html
[main-concepts-generator]:
../main-concept/generator.html
