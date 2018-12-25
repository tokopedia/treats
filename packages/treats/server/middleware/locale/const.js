import locales from "@@BUILD_LOCALE_PATH@@";

export const SUPPORTED_LANG = Object.keys(locales);

export const DEFAULT_LANG = SUPPORTED_LANG[0];
