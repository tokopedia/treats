---
id: typescript
title: Working with Typescript
sidebar_label: Typescript
---
Treats also provide Typescript support. If you write your projects in Typescript, Treats will recognize the syntax and render your component. We provide support both in our `create-treats-app` and `treats` commands.

"How Treats recognize our projects as a Typescript projects?"

Good question. Treats will recognize your projects as a Typescript projects when you provide `tsconfig.json` in your projects root. Therefore, **please be aware when it is necessary to add `tsconfig.json` into your projects**.

### Create Your First Typescript Treats App
To start Typescript Treats project, simply add `--ts` or `--typescript` option on `create-treats-app` command.

```
~$ create-treats-app --ts
```

After you type this command, a prompt will be appear to ask your project _name_, _version_, and _description_. Yes, the prompt is similar with regular `create-treats-app`, the only difference are the default name and description.

```
 Treats >  Welcome to Treats! Let's setup your app, shall we?
prompt: Application name:  (my-ts-treats-app) <your-app-name>
prompt: Application version:  (0.0.1) <your-app-version>
prompt: Application description:  (My First Treats App in Typescript) <your-app-description>
```

After you finish fill the prompt, Treats will install the dependencies for you. So get some tea for you first and rest for a bit :)

Finished! Congratulations your first Treats app in Typescript is already generated. To start the projects, type `yarn start` or `npm start`

```
cd <your-projects-name>
yarn start
```

### Typescript Generator
As written in [Generator][main-concept-generator], to generate Typescript built-in template (component, redux, test, helper, and middleware) just add "-ts" in our built-in template.

```
yarn generate component-ts
```

**However, Treats will generate Typescript template by default when `tsconfig.json` is found** in your projects. Therefore, once again, _please be aware when it is necessary to add `tsconfig.json` into your projects_.

[main-concept-generator]: ./generator.html
