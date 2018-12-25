const semver = require("semver"),
    currentVersion = process.version;

function polyfill() {
    if (semver.lt(currentVersion, "6.4.0")) {
        require("babel-polyfill");
        require("babel-register")({
            presets: ["env", "stage-2"]
        });
        return true;
    }
    return false;
}

module.exports = polyfill;
