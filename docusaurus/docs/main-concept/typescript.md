---
id: typescript
title: Working with Typescript
sidebar_label: Typescript
---
Treats also provide Typescript support. If you write your projects in Typescript, Treats will recognize the syntax and render your component. We provide support both in our `create-treats-app` and `treats` commands.

"How Treats recognize our projects as a Typescript projects?"

Good question. Treats will recognize your projects as a Typescript projects when you provide `tsconfig.json` in your projects root. Therefore, **please be aware when it is necessary to add `tsconfig.json` into your projects**.

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

[main-concept-generator]: ./generator.html
