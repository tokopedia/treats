const extractEnv = env => ({
    env: env.NODE_ENV,
    treatsPort: env.TREATS_PORT || 3000,
    wdsPort: env.WDS_PORT || 3001,
    webpack: {
        define: {
            "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
            "process.env.WDS_PORT": JSON.stringify(env.WDS_PORT)
        },
        op: process.env.WEBPACK_OP || "compile"
    }
});

module.exports = extractEnv;
