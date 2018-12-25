// This loader just returns the monitor source
// this way it can be embedded without processing or messing with external handling
const monitorFn = require("./monitor");

const monitorSrc = `(${monitorFn.toString()})()`;

const loader = () => monitorSrc;

module.exports = loader;
