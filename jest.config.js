const path = require("path"),
    TREATS_ALIAS = require("./packages/treats/alias");

const resolver = Object.keys(TREATS_ALIAS).reduce((result, key) => {
    result[`^${key}(.*)$`] = `${TREATS_ALIAS[key]}$1`;
    return result;
}, {});

let coverageThreshold;

if (process.env.TEST_ENV !== "lint-staged") {
    coverageThreshold = {
        global: {
            branches: 2,
            functions: 2,
            lines: 2,
            statements: 2
        }
    };
}

module.exports = {
    verbose: true,
    testURL: "http://localhost/",
    setupFiles: [path.join(__dirname, "./jestsetup.js")],
    globals: {
        NODE_ENV: "test"
    },
    snapshotSerializers: ["enzyme-to-json/serializer"],
    moduleFileExtensions: ["js", "jsx", "json"],
    moduleNameMapper: {
        "^.+\\.(css|scss)$": "identity-obj-proxy",
        ...resolver
    },
    testPathIgnorePatterns: ["node_modules/", "generator/"],
    coveragePathIgnorePatterns: ["node_modules/", "generator/"],
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/**/*.{js}", "!<rootDir>/**/*.stories.js"],
    coverageReporters: ["html"],
    coverageThreshold
};
