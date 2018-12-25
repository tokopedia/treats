// @flow
import { isString } from "./typecheck";

/**
 * Convert camelCase to kebab-case.
 * @param str string to be converted
 * @author Felix Tan
 */
export const camelToKebabCase = (str: string): string =>
    (isString(str) && str.replace(/[A-Z]/g, (char: string): string => `-${char.toLowerCase()}`)) ||
    str;
