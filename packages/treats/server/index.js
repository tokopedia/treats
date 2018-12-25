import initServer from "./init";
import { eventTypes } from "./helper/event";
import LocaleMiddlewareEventTypes from "./middleware/locale/event";

export const EVENT_TYPES = { ...eventTypes, ...LocaleMiddlewareEventTypes };

export default initServer;
