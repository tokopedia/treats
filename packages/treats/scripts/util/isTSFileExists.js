const fs = require("fs-extra"),
    glob = require("glob"),
    path = require("path"),
    logger = require("./logger"),
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
            fs.writeFileSync(
                path.resolve(ROOT_PATH, "./tsconfig.json"),
                JSON.stringify({}, null, 4),
                err => {
                    logger("error", err.stack || err);
                }
            );
        }

        return true;
    }

    return false;
};

module.exports = isTSFileExists;
