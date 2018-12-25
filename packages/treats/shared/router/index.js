import routes from "@@BUILD_ROUTE_PATH@@";
import module from "@@BUILD_ROUTE_MODULE_PATH@@";

const routeEntries = routes.map(route => {
    const { path } = route,
        result = { ...route, component: module[path] };

    return result;
});

export default routeEntries;
