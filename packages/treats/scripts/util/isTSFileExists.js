const glob = require("glob"),
    path = require("path"),
    ROOT_PATH = process.cwd();

/**
 * A function to check if there's .ts or .tsx files in Treats projects.
 * @author Martino Christanto Khuangga
 */
const isTSFileExists = () => {
    const tsFiles = glob.sync("**/*.*(ts|tsx)", { cwd: path.resolve(ROOT_PATH, "./src") });

    if (tsFiles.length > 0) {
        return true;
    }

    return false;
};

module.exports = isTSFileExists;
