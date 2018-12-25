const path = require("path"),
    babelOptions = require("./babel.config"),
    ROOT_PATH = process.cwd(),
    babelMerge = require("babel-merge"),
    userBabelOptions = require(path.resolve(ROOT_PATH, "./treats.config.js")).babel,
    babelOpts = userBabelOptions ? babelMerge(babelOptions, userBabelOptions) : babelOptions,
    jestTransformer = require("babel-jest").createTransformer(babelOpts);

module.exports = jestTransformer;
