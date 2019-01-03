const fs = require("fs-extra"),
    glob = require("glob"),
    path = require("path"),
    logger = require("./logger"),
    chalk = require("chalk"),
    ROOT_PATH = process.cwd();

/**
 * A function to check if there's .ts or .tsx files in Treats projects.
 * @author Martino Christanto Khuangga
 */
const isTSFileExists = () => {
    const tsFiles = glob.sync("**/*.*(ts|tsx)", { cwd: path.resolve(ROOT_PATH, "./src") });

    if (tsFiles.length > 0) {
        logger("warn", "Typescript files were found in your projects\n");
        if (!fs.existsSync(path.resolve(ROOT_PATH, "./tsconfig.json"))) {
            logger("warn", "Generating tsconfig.json\n");
            fs.writeFileSync(path.resolve(ROOT_PATH, "./tsconfig.json"), JSON.stringify({}, null, 4), err => {
                logger("error", err.stack || err);
            });
        }
        
        return true;
    }

    return false;
}

/**
 * A function to check if developer already installed Treats required Typescript dependencies or not yet.
 * @author Martino Christanto Khuangga
 */
const checkTypescript = () => {
    if (isTSFileExists()) {
        const nodeModulesPath = path.resolve(ROOT_PATH, "./node_modules"),
            dependencies = [
                path.resolve(nodeModulesPath, "./cache-loader"),
                path.resolve(nodeModulesPath, "./fork-ts-checker-webpack-plugin"),
                path.resolve(nodeModulesPath, "./typescript"),
                path.resolve(nodeModulesPath, "./ts-loader"),
                path.resolve(nodeModulesPath, "./@types/jest"),
                path.resolve(nodeModulesPath, "./@types/node"),
                path.resolve(nodeModulesPath, "./@types/react"),
                path.resolve(nodeModulesPath, "./@types/react-dom"),
                path.resolve(nodeModulesPath, "./@types/react-helmet"),
                path.resolve(nodeModulesPath, "./@types/react-intl"),
                path.resolve(nodeModulesPath, "./@types/react-redux"),
                path.resolve(nodeModulesPath, "./@types/react-router-dom"),
                path.resolve(nodeModulesPath, "./@types/redux")
            ],
            isYarn = fs.pathExistsSync(path.resolve(ROOT_PATH, "./yarn.lock"));
        
        let isDependenciesValid = true;
        dependencies.forEach(dep => {
            if (!fs.pathExistsSync(dep)) {
                const moduleName = path.relative(nodeModulesPath, dep)
                logger("error", `Oops! You don't have ${chalk.bold(moduleName)} in your dependencies.`);
                logger("error", `Please install ${chalk.bold(moduleName)}`);
                logger("error", `Type ${isYarn ? chalk.green(`yarn add ${moduleName}`) : chalk.green(`npm install ${moduleName}`)}\n`);
                isDependenciesValid = false;
            }
        });

        if (!isDependenciesValid) {
            logger("error", "Aborting process...");
            process.exit(1);
        }
    }
}

module.exports = checkTypescript;
