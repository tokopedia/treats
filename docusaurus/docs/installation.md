---
id: installation
title: Installation
sidebar_label: Installation
---

In this chapter we'll learn how to setup our first Treats app, Treats is an easily extensible, feature-rich NodeJS+React Framework. With Treats, you don't need to configure webpack, babel, or any other build tools by yourself.

## Quick Setup Guide

**NOTE**: Before proceed to the first step, please make sure you have installed [npm] and [yarn] on your PC.

1. To start creating Treats project, install *create-treats-app* globally.
```
// With NPM
$ npm install -g create-treats-app

// With yarn
$ yarn global add create-treats-app
```
2. Run create-treats-app on your terminal. Enter app details that you need when prompted.
```
$ create-treats-app
```
3. Wait the installation done and start your app. To start your app, go to your app directory and start the app.
```
$ cd /YOUR/APP/DIRECTORY
$ yarn start
```
4. Open your browser and browse for http://localhost:3000. You should see below image on your browser.

![Welcome Treats App](../img/welcome-treats-app.png)

If you have any problem see the [FAQ][faq] section or you may consider [filing an issue][new-issues] with your suggestions for improvement.

## What's in the box?
1. React, JSX, ES6, and Flow syntax support (TypeScript support is coming!).
2. Preconfigured Redux, GraphQL client and i18n out-of-the-box. *(You can disable Redux/GraphQL client if you're not using it, it'll only leave minimum trace in your build)*
3. Server-side rendering, code-splitting and hot-module replacement configured out-of-the-box.
4. CSS Modules support with CSS, LESS, or SASS syntax with autoprefixer, or use any CSS-in-JS library that you like!
5. A build script to bundle JS, CSS, images and other medias for production.
6. Built-in code generator so you wouldn't need to wrote another boilerplate codes.
7. Work out of the box with zero configuration for light usage, but easily customizable for power users. Treats is customizable with:
    - Custom Helpers (Server-side)
    - Custom Middlewares (Server-side)
    - Custom React App, Server App, GraphQL client & Redux Implementation, etc
    - Custom Webpack, Babel & PostCSS Config
8. Filesystem as your API *(all entry hooks file and folder are under `src/_**`)*

## What's next?

### Tutorial
Tutorial is coming soon! Please be patient :)

### Learn Treats Concept
If you prefer to skip the tutorial and want to **learn by grasping the concept of Treats**, our [guides to main concepts][main-concept] is the perfect place to start for you.

### API Reference
After you've grasped the [main concept][main-concept] you might want to checkout our [API Reference][api-reference] to see what's available inside Treats.

### Authoring Addons
The main advantage of using Treats for developing your React apps is the ability to customize Treats with addons that provides helpers, middlewares, generators, components, etc. You might want to checkout [List of available Treats addons][list-of-addons] to make sure that someone haven't built addons that suits your need. Or you can go to [Authoring Addons][authoring-addons] section, you'll learn more about how to build and share these addons so it can be used by our fellow community member.

### FAQs
There is also a [FAQ][faq] section dedicated to answer commonly asked questions about Treats.

### Contributing
We always open to any help! please refer to [our contribution guidelines][contributing] to get you started.

### Missing Documentations?
If you can't find anything about your issues on our documentation or you find some parts of our documentation to be confusing, please consider [filing an issue][new-issues] with your suggestions for improvement. We love hearing from you!

[tutorial]: practical-tutorial/01.html
[main-concept]: main-concept/overview.html
[api-reference]: api-reference/overview.html
[list-of-addons]: list-of-addons.html
[authoring-addons]: authoring-addons/overview.html
[contributing]: contributing/how-to-contribute.html
[faq]: faq.html
[new-issues]: https://github.com/tokopedia/treats/issues/new
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/en/
