// @flow
import serializeLib from "serialize-javascript";

import { isString, isObject } from "@treats/util/typecheck";

/**
 * Deserialize serialized JSON string into valid JSON.
 * @param serializedJSON string to be deserialized
 * @author Felix Tan
 */
export const deserializeJSON = (serializedJSON: any): {} => {
    let result = serializedJSON;
    if (serializedJSON) {
        try {
            result = JSON.parse(serializedJSON);
        } catch (err) {
            console.warn("[Deserialize JSON] Failed, not valid JSON");
            console.error(err);
        }
    }
    return result;
};

/**
 * Serialize JSON into serialized JSON string.
 * @param JSONObj JSON object to be serialized
 * @param options Additional options
 * @author Felix Tan
 */
export const serializeJSON = (JSONObj: {}, options: ?{}): string =>
    serializeLib(JSONObj, { ...options, isJSON: true });

/**
 * Escape HTML string to prevent XSS.
 * @param string string to be escaped
 * @author Felix Tan
 */
export const escapeHtml = (string: string): string => {
    if (isString(string)) {
        const entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"
        };
        return string.slice(0, string.length).replace(/[&<>"]/g, (s: string): string => entityMap[s]);
    }
    return string;
};

/**
 * Loop over Object to escape each of its value to prevent XSS.
 * @param obj object to be escaped
 * @author Felix Tan
 */
export const escapeHtmlQueryObject = (obj: { [string]: string }): { [string]: string } => {
    let result = obj;
    if (obj && isObject(obj)) {
        result = Object.keys(obj).reduce((res: { [string]: string }, key: string): {
            [string]: string
        } => {
            res[key] = escapeHtml(obj[key]);
            return res;
        }, {});
    } else if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
        console.error(`FilterXSSQueryObject can't process ${obj.toString()}`);
    }
    return result;
};
