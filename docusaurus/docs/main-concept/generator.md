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
2. `redux` -  Generates Redux boilerplates (action creator, reducer, thunks, etc).
3. `test` - Generates Jest test boilerplates.
4. `helper` -  Generates Treats helper object boilerplates.
5. `middleware` -  Generates Treats middleware object boilerplates.

We also provide Typescript template for these templates. To generate Typescript templates add "-ts" suffix to each template name.

```
yarn generate component-ts
```

However, you don't need to add the "-ts" part when you provide `tsconfig.json` in your project root. **By providing `tsconfig.json`, Treats will automatically generate Typescript component** even when you don't type "-ts" suffix after template name.

For more information about how to create your own template you can find it [here][authoring-addons-generators]

[authoring-addons-generators]: ../authoring-addons/generator.html
