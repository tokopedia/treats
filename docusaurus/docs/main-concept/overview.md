---
id: overview
title: Overview 
sidebar_label: Overview 
---

In this section you'll learn the philosophy behind Treats creation, main concepts of Treats and how to customize your Treats project to better suits your need.

## Philosophy
When we build Treats, our main goal was to be able to rapidly iterate our frontend-engineering process with React by eliminating some unnecessary repeated process such as setting up build tools, installing dependencies, setting up localization, state-management, GraphQL client, etc but still maintains the flexibility of customization that might be needed on each projects. We then tried to look at many starter kits, frameworks, tool kits that might cater our needs, but unfortunately we didn't find any. So, like all nerds out there, we decided to build our own React framework! We build Treats with the following philosophy in mind:
1. Provides users with list of curated essential dependencies to kickstart their projects such as i18n, state management, graphQL client, head tag management and build tools. 
2. Can work with zero configuration but flexible enough for power users to configure their project.
3. App implementation that easily customizable for power users, and for users who didn't need to customize their app, they could just use our default implementation. 
4. Easily extensible with addons.
5. Painless update - update should be as simple as bumping Treats dependency on users `package.json`.

## Scripts
Treats comes with useful `treats` command line interface to manage your Treats project. The following commands are available:
1. **start** - Start the development environment with Hot Module Replacement enabled.
2. **build** - Build and bundle both client-side and server-side assets. 
3. **generate** - Generate source codes based on a treats generator folder.
4. **clean** - Flush all files that had been built by treats.
5. **documentation** - Manage code documentations.
6. **test** - Ran unit tests with Jest

The detailed instructions about each of these commands can be found [here][scripts]

## Filesystem Hooks
Treats uses several files and folders as APIs for customizing app implementations, throughout your journey on learning main concepts of Treats, you'll encounter many files and folders that serves as filesystem hooks for Treats. List of these files and folders can be found [here][filesystem-hooks].

## Configuration Files
There are two type of configuration files that can be supplied to Treats app:
1. **Build config** - configuration file that needed on build process via `treats.config.js` more on this [here][build-config].
2. **Runtime config** - configuration file that will be supplied to your server at runtime, so you didn't need to deploy your code just to change a configuration, more on this [here][runtime-config]

[scripts]: scripts.html
[build-config]: build-config.html
[runtime-config]: runtime-config.html
[filesystem-hooks]: ../api-reference/filesystem-hooks.html
