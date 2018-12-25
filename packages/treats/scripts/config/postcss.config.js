const ResolverFactory = require("enhanced-resolve/lib/ResolverFactory"),
    NodeJsInputFileSystem = require("enhanced-resolve/lib/NodeJsInputFileSystem"),
    CachedInputFileSystem = require("enhanced-resolve/lib/CachedInputFileSystem");

const CACHED_DURATION = 60000;
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), CACHED_DURATION);

module.exports = ({ options }) => {
    const { alias, variables, plugins } = options,
        resolver = ResolverFactory.createResolver({
            alias,
            extensions: [".css"],
            modules: ["src", "node_modules"],
            useSyncFileSystemCalls: true,
            fileSystem
        }),
        guardedPlugins = plugins || {
            "postcss-import": {
                resolve(id, basedir) {
                    return resolver.resolveSync({}, basedir, id);
                }
            },
            "postcss-simple-vars": {
                variables
            },
            "postcss-icss-values": {},
            "postcss-icss-keyframes": {},
            "postcss-math": {},
            autoprefixer: {
                remove: false
            }
        };

    return {
        plugins: guardedPlugins
    };
};
