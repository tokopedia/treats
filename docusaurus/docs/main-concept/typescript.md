---
id: typescript
title: Working with Typescript
sidebar_label: Typescript
---
Treats also provide Typescript support. If you write your projects in Typescript, Treats will recognize the syntax and render your component. We provide support both in our `create-treats-app` and `treats` commands.

"How Treats recognize our projects as a Typescript projects?"

Good question. Treats will recognize your projects as a Typescript projects when you provide `.ts or .tsx` in your projects root. Therefore, **please be aware when it is necessary to add `.(ts|tsx) files` into your projects**.

### Create Your First Typescript Treats App
To start Typescript Treats project, simply choose `true (t)` when prompted about Typescript usage on `create-treats-app` command.

```
 Treats >  Welcome to Treats! Let's setup your app, shall we?
prompt: Application name:  (my-ts-treats-app) <your-app-name>
prompt: Application version:  (0.0.1) <your-app-version>
prompt: Application description:  (My First Treats App in Typescript) <your-app-description>
prompt: Do you want to use Typescript? (true (t)|false (f)): (false)
```

After you finish fill the prompt, Treats will install the dependencies for you. So get some tea for you first and rest for a bit :)

Finished! Congratulations your first Treats app in Typescript is already generated. To start the projects, type `yarn start` or `npm start`

```
cd <your-projects-name>
yarn start
```

### Typescript Generator
As written in [Generator][main-concept-generator], to generate Typescript built-in template (component, redux, test, helper, and middleware), simply choose `true (t)` when prompted about Typescript usage.

### Typescript Config
As we know, Typescript projects require `tsconfig.json`. We also understand that some of its configurations redundant with our `treats.config.(js|ts)`. Therefore, we create a Typescript handler in our `treats.config.(js|ts)`. This will make our `tsconfig.json` a generated file, which means: __"Please do not change config in tsconfig.json. Make your change in treats.config.(js|ts) instead"__.

The Typescript field content will be the same as `tsconfig.json`, so please check the [docs][tsconfig-docs], if you want to customize one. Nothing to fear if you don't want to customize one, we have default config and will generate it for you the moment you `start` or `build` your projects.

Here's some example of `treats.config.(js|ts)`:

```
// treats.config.(js|ts)
...
const config = {
    ...,

    typescript: {
        ...,
        "compilerOptions": {
            ...,
            target: "es5",
            paths: {
                someAlias: [
                    "./path/to/alias"
                ]
            }
        } 
    }
};

module.exports = config;
```


[main-concept-generator]: ./generator.html
[tsconfig-docs]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
