// @flow
import { matchPath } from "react-router-dom";
import routes from "@@BUILD_ROUTE_PATH@@";
import type { RouteType } from "../../flow-typed/router";

/**
 * Find active routes from given path
 * @param path Path to be searched
 * @author Felix Tan
 */

export const findActiveRoute = (path: string): ?RouteType => {
    let result;
    for (let i = 0; i < routes.length; i++) {
        const isMatch = matchPath(path, routes[i]);
        if (isMatch !== null) {
            result = routes[i];
            break;
        }
    }
    return result;
};

/**
 * Check if path is exist in current global route
 * @param path Path that will be checked
 * @author Felix Tan
 */
export const isPushEnabled = (path: string, exclude: ?(string[])): boolean => {
    const pathName = path.split("?")[0];
    let result = false;
    for (let i = 0; i < routes.length; i++) {
        let isMatch = null;
        if (routes[i].isPush !== false && (!exclude || exclude.indexOf(routes[i].path) === -1)) {
            isMatch = matchPath(pathName, routes[i]);
        }
        if (isMatch !== null) {
            result = true;
            break;
        }
    }
    return result;
};

/**
 * Get URL pathname from location object.
 * @param location Location object to get pathname
 * @author Felix Tan
 */
export const getURLfromLocation = (location: LocationType): string =>
    location ? `${location.pathname || ""}${location.search || ""}` : "";
