#!/usr/bin/env node
const nodePolyfill = require("./scripts/util/polyfill");

nodePolyfill();

const yargs = require("yargs");

//eslint-disable-next-line
yargs
    .options({
        debug: {
            describe: "Debug mode"
        }
    })
    .command(
        "clean",
        "Clean build results",
        () => {},
        argv => {
            require("./scripts/clean")(argv);
        }
    )
    .command(
        "generate <template>",
        "Generate based on template",
        () => {},
        argv => {
            require("./scripts/generate")(argv);
        }
    )
    .command(
        "documentation <command>",
        "Build Documentation",
        cmd =>
            cmd.options({
                directory: {
                    describe: "Specify which directory to build the documentation"
                }
            }),
        argv => {
            require("./scripts/documentation")(argv);
        }
    )
    .command(
        "start",
        "Start Development server",
        cmd =>
            cmd.options({
                port: {
                    describe: "Specify port to run treats server"
                },
                wdsport: {
                    describe: "Specify port to run WDS server"
                },
                env: {
                    describe: "Specify which environment to build (process.env.NODE_ENV)"
                }
            }),
        argv => {
            require("./scripts/start")(argv);
        }
    )
    .command(
        "build",
        "Build Treats",
        cmd =>
            cmd.options({
                env: {
                    describe: "Specify which environment to build (process.env.NODE_ENV)"
                },
                analyze: {
                    describe: "Display bundle analyzer map to see which bundle is the biggest :)"
                },
                target: {
                    describe: "Specify build target (client|server)"
                }
            }),
        argv => {
            require("./scripts/build")(argv);
        }
    )
    .command(
        "test",
        "Ran Tests",
        () => {},
        argv => {
            require("./scripts/test")(argv);
        }
    )
    .epilog(
        " 🍰  Treats - Tokopedia React Development Kits, learn more on our documentation https://github.com/tokopedia/treats"
    )
    .help().argv;
