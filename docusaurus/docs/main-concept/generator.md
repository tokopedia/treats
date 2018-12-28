---
id: generator
title: Code Generator
sidebar_label: Code Generator
---

Treats provides code generator to make bootstraping, generating, or updating your existing codebase easier. You can use this generator with `treats generate`. You can use several built-in generator in Treats such as `component`, `redux`, `middleware`, and `helper`, template directory path or `@treats/*` for generator templates inside Treats addons.

![generator](assets/generator.gif)

```sh
// Built-in generator
treats generate component

// generator templates inside Treats addons
treats generate @treats/addons-base/generator/opinionated

// Template directory path
treats generate ./node_modules/@treats/addons-base/generator/opinionated
```
There's several built-in generator that you can use:
1. `component` - Generates React component boilerplates.
2. `component-ts` - Generates React component boilerplates in Typescript.
3. `redux` -  Generates Redux boilerplates (action creator, reducer, thunks, etc).
4. `redux-ts` - Generates Redux boulerplates (action creator, reducer, thunks, etc) in Typescript.
5. `test` - Generates Jest test boilerplates.
6. `test-ts` - Generates Jest test boilerplates in Typescript.
7. `helper` -  Generates Treats helper object boilerplates.
8. `helper-ts` - Generates Treats helper object boilerplates in Typescript.
9. `middleware` -  Generates Treats middleware object boilerplates.
10. `middlerware-ts` - Generates Treats middleware object boilerplates in Typescript.

For more information about how to create your own template you can find it [here][authoring-addons-generators]

[authoring-addons-generators]: ../authoring-addons/generator.html
