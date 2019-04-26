const fs = require("fs-extra"),
    ROOT_PATH = process.cwd(),
    path = require("path"),
    alias = require("../../alias"),
    logger = require("./logger"),
    babel = require("@babel/core");

/**
 * Generate on-demand routes for development.
 * @param {boolean} useTypescript is projects contain Typescript
 * @param {string} modules user chosen modules
 *
 * @author Martino Christanto Khuangga
 */
const setupDevModules = (useTypescript, modules) => {
    const routePath = alias["@@BUILD_ROUTE_PATH@@"],
        appPaths = alias["@@BUILD_ROUTE_PATH@@"].replace("route.", "path."),
        modulePath = alias["@@BUILD_ROUTE_MODULE_PATH@@"],
        devRoutePath = path.resolve(
            ROOT_PATH,
            `./src/_route/route.development.${useTypescript ? "ts" : "js"}`
        ),
        devModulePath = path.resolve(
            ROOT_PATH,
            `./src/_route/module.development.${useTypescript ? "ts" : "js"}`
        ),
        onDemandModules = modules ? modules.split(",") : [];

    //Write the whole files if user doesn't provide on-demand modules
    if (onDemandModules.length === 0) {
        fs.copyFileSync(routePath, devRoutePath);
        fs.copyFileSync(modulePath, devModulePath);
        return;
    }

    logger("log", `Transpiling _route/path.${useTypescript ? "ts" : "js"}`);

    //Transpile _route/route.(js|ts) and _route/path(js|ts) to CommonJS
    const routesCode = fs.readFileSync(routePath),
        pathCode = fs.readFileSync(appPaths),
        parsedRouteAst = babel.parse(routesCode),
        parsedPathAst = babel.parse(pathCode),
        { code: newPathCode } = babel.transformFromAstSync(parsedPathAst, pathCode, {
            plugins: ["transform-es2015-modules-commonjs"]
        });

    logger(
        "warn",
        `Rewriting temporary _route/path.${useTypescript ? "ts" : "js"}. Do not stop the process`
    );
    fs.writeFileSync(appPaths, newPathCode);

    const { code } = babel.transformFromAstSync(parsedRouteAst, routesCode, {
        plugins: ["transform-es2015-modules-commonjs"]
    });

    logger("log", `Generating development on-demand routes: ${modules}`);
    fs.writeFileSync(devRoutePath, code);

    let finalRoutesContent = "",
        finalModulesContent = "",
        importedPathStrings = "";

    const currentRoutes = require(devRoutePath).default,
        finalRoutes = currentRoutes.filter(route => onDemandModules.indexOf(route.name) !== -1),
        moduleObject = {},
        modifiedRoutes = [];

    //Generating required modules variable names
    finalRoutes.forEach((route, index) => {
        finalModulesContent += `import ${route.name.charAt(0).toUpperCase()}${route.name.slice(
            1
        )} from "@page/${route.name}";\n`;
        moduleObject[`[${route.name.toUpperCase()}]`] = `${route.name
            .charAt(0)
            .toUpperCase()}${route.name.slice(1)}`;
        importedPathStrings += `${route.name.toUpperCase()}${
            index < finalRoutes.length - 1 ? ", " : ""
        }`;

        modifiedRoutes.push({
            ...route,
            path: route.name.toUpperCase()
        });
    });

    finalModulesContent += `\nimport { ${importedPathStrings} } from "./path";\n\n`;
    finalModulesContent += `const module = ${JSON.stringify(
        moduleObject,
        (key, value) => value,
        4
    ).replace(new RegExp("\"|'", "g"), "")}`;
    finalModulesContent += "\n\nexport default module;\n";
    fs.writeFileSync(devModulePath, finalModulesContent);

    finalRoutesContent += `import { ${importedPathStrings} } from "./path";\n\n`;
    finalRoutesContent += `const route = ${JSON.stringify(
        modifiedRoutes,
        (key, value) => {
            if (key === "path") {
                return `@@${value}@@`;
            }
            return value;
        },
        4
    ).replace(new RegExp("\"@@|'@@|@@\"|@@'", "g"), "")};`;
    finalRoutesContent += "\n\nexport default route;\n";

    fs.writeFileSync(devRoutePath, finalRoutesContent);

    logger(
        "warn",
        `Revert back _route/path.${useTypescript ? "ts" : "js"}. Do not stop the process`
    );
    fs.writeFileSync(appPaths, pathCode);

    logger("debug", "On-demand routes generated!");
};

module.exports = setupDevModules;
