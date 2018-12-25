---
id: scripts
title: Scripts
sidebar_label: Scripts
---

Treats provides `treats` CLI to easily manage your Treats project. There's several commands that could be used with `treats`:
1. `clean` - Clean build results
2. `generate <template>` - Generate codes based on template
3. `documentation <command>`  - To interact with documentation generator API.
4. `start` - To Start development server.
5. `build` - To build Treats bundle.
6. `test` - Ran unit tests with Jest.

## Clean
Used to clean several directories that Treats build: `dist/`, `public/` & `stats/`.

```sh
treats clean

Options:
    --version  Show version number                                       [boolean]
    --debug      Debug mode                                              [boolean]
    --help     Show help                                                 [boolean]
```

## Generate
Used to generate codes based on template
```sh
treats generate <template>

Options:
    --version  Show version number                                       [boolean]
    --help     Show help                                                 [boolean]
    --debug      Debug mode                                              [boolean]
```
`<template>` can be either:
1. `component` - Generates React component boilerplates.
2. `redux` -  Generates Redux boilerplates (action creator, reducer, thunks, etc).
3. `test` - Generates Jest test boilerplates.
4. `helper` -  Generates Treats helper object boilerplates.
5. `middleware` -  Generates Treats middleware object boilerplates.
6. Your own template directory

## Documentation
Used to interact with documentation generator API
```sh
treats documentation <command>

Options:
    --version    Show version number                                     [boolean]
    --debug      Debug mode                                              [boolean]
    --help       Show help                                               [boolean]
    --directory  Specify which directory to build documentation
    --target Target for current operation
```

`<command>` can be either:
1. `build` - To build documentation
2. `lint` - Lint documentation
3. `export` - To export documentation (use `--target`, currently only `phriction` available as target).

## Start
Used to start local development server
```sh
treats start

Options:
  --version  Show version number                                       [boolean]
  --debug    Debug mode
  --help     Show help                                                 [boolean]
  --port     Specify port to run treats server
  --wdsport  Specify port to run Webpack Dev Server
  --env      Specify which environment to build (process.env.NODE_ENV)
```

## Build
Used to build distribution bundle.
```sh
treats build

Options:
  --version  Show version number                                       [boolean]
  --debug    Debug mode
  --help     Show help                                                 [boolean]
  --env      Specify which environment to build (process.env.NODE_ENV)
  --analyze  Display bundle analyzer map to see which bundle is the biggest :)
  --target   Specify build target (client|server)
```

## Test
Used to ran unit tests with Jest.
```sh
treats test

Options:
  --debug    Debug mode
  --help     Show help                          
  All other Jest CLI Options
```
