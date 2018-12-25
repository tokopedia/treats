const path = require("path"),
    ROOT_PATH = process.cwd(),
    { alias, jest: userDefinedConfig } = require("../util/load-config")({ webpack: false });

const resolver = Object.keys(alias).reduce((result, key) => {
    result[`^${key}(.*)$`] = `${alias[key]}$1`;
    return result;
}, {});

let finalJestConfig = {
    verbose: true,
    rootDir: ROOT_PATH,
    setupFiles: [path.resolve(__dirname, "./jestSetup.js")],
    globals: {
        NODE_ENV: "test"
    },
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ],
    testURL: "http://localhost/",
    transform: {
        "^.+\\.(js|jsx)?$": path.resolve(__dirname, "./jestTransformer.js")
    },
    transformIgnorePatterns: ["node_modules/(?!(treats)/)"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
    moduleNameMapper: {
        "^.+.(css|scss|sass|less)$": "identity-obj-proxy",
        "^.+.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/node_modules/treats/__mocks__/fileMocks.js",
        ...resolver
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coverageReporters: ["html"]
};

if (userDefinedConfig) {
    const merge = require("lodash.merge");
    finalJestConfig = merge(finalJestConfig, userDefinedConfig);
}

module.exports = finalJestConfig;
