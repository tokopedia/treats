const chalk = require("chalk");

const logger = (level, message, ...args) => {
    if (level === "debug" && process.env.TREATS_SCRIPT_DEBUG) {
        // eslint-disable-next-line
        console.log(chalk.bgCyan(" Debug ") + chalk.cyan(message), ...args);
    } else if (level !== "debug") {
        switch (level) {
            case "log":
                // eslint-disable-next-line
                console.log(`${chalk.bgGreen(" Treats > ")} ${message}`, ...args);
                break;
            case "warn":
                console.warn(`${chalk.bgYellow(" WARN! ")} ${message}`, ...args);
                break;
            case "error":
                console.error(
                    `${chalk.bgRed(" ERROR! ")} ${
                        typeof message === "string" ? message : message.stack
                    }`,
                    ...args
                );
                break;
            case "clear":
                process.stdout.write(
                    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
                );
                break;
            default:
                // eslint-disable-next-line
                console[level](chalk.red(message), ...args);
        }
    }
    return true;
};

module.exports = logger;
