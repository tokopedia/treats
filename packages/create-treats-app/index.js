#!/usr/bin/env node
const nodePolyfill = require("./scripts/util/polyfill");

nodePolyfill();

const argv = require("yargs")
    .options({
        debug: {
            describe: "Debug mode"
        }
    })
    .options({
        typescript: {
            alias: "ts",
            describe: "Use Typescript language in Treats Apps"
        }
    })
    .help()
    .epilog(
        " 🍰  Treats - Tokopedia React Development Kits, learn more on our documentation https://github.com/tokopedia/treats"
    )
    .strict().argv;

const useTypescript = argv.typescript;

require("./scripts/generate")({
    template: useTypescript ? "create-treats-app-typescript" : "create-treats-app",
    noconfig: true, ...argv 
});
