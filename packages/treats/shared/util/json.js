// @flow
import { isArray, isString, isObject } from "@treats/util/typecheck";

/**
 * Inject params ${value} to single string
 * @param str String to bind params to
 * @param params Params that will be bound to the string
 * @author Felix Tan
 */
export const injectParam = (str: string, params: { [string]: string }): string => {
    let result = str ? str.slice(0, str.length) : "";
    const paramFound = result.match(/\$\{([\s]*[^;\s\{]+[\s]*)\}/gi) || [];
    if (params && paramFound !== null && paramFound.length > 0) {
        for (let i = 0; i < paramFound.length; i++) {
            const pr = /\$\{([\s]*[^;\s\{]+[\s]*)\}/gi.exec(paramFound[i])[1].split(".");
            let value;
            for (let j = 0; j < pr.length; j++) {
                value = params[pr[j]];
            }
            if (value) {
                /* Escape string before converting it to regexp */
                const exp = paramFound[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                result = result.replace(new RegExp(exp, "gi"), value);
            }
        }
    }
    return result;
};

/**
 * Bind params ${value} to each value of json object
 * @param obj Object to bind params to
 * @param params Params that will be bound to the object
 * @author Felix Tan
 */
export const bindParams = (
    obj: {} | [] | string,
    params: { [string]: string }
): {} | [] | string => {
    let result = obj;
    /* obj is Array */
    if (isArray(obj)) {
        result = [...obj];
        for (let i = 0; i < result.length; i++) {
            if (isString(result[i])) {
                result[i] = injectParam(result[i], params);
            } else {
                result[i] = bindParams(result[i], params);
            }
        }
    } else if (isObject(obj)) {
        result = { ...obj };
        Object.keys(result).forEach((key: string) => {
            if (isString(result[key])) {
                result[key] = injectParam(result[key], params);
            } else {
                result[key] = bindParams(result[key], params);
            }
        });
    }
    return result;
};
