#!/usr/bin/env node
const nodePolyfill = require("./scripts/util/polyfill");

nodePolyfill();

const argv = require("yargs")
    .options({
        debug: {
            describe: "Debug mode"
        }
    })
    .help()
    .epilog(
        " 🍰  Treats - Tokopedia React Development Kits, learn more on our documentation https://github.com/tokopedia/treats"
    )
    .strict().argv;

require("./scripts/generate")({ template: "create-treats-app", noconfig: true, ...argv });
