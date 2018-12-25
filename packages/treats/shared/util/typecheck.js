// @flow
/**
 * Check if given value is an array.
 * @param val value
 * @author Felix Tan
 */
export const isArray = (val: any): boolean => val instanceof Array;

/**
 * Check if given value is a string.
 * @param val value
 * @author Felix Tan
 */
export const isString = (val: any): boolean => typeof val === "string";

/**
 * Check if given value is an object.
 * @param val value
 * @author Felix Tan
 */
export const isObject = (val: any): boolean =>
    typeof val === "object" && !isArray(val) && val !== null;

/**
 * Check if given value is a number.
 * @param val value
 * @author Felix Tan
 */
export const isNumber = (val: any): boolean => typeof val === "number" && !Number.isNaN(val);

export const isFunction = (val: any): boolean => typeof val === "function";
