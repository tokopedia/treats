//@flow
import type { $Application } from "express";
import type { HelperInterfaceType } from "@treats/flow-typed/helper";

import { isFunction } from "@treats/util/typecheck";

type EventHelperType = {
    ...HelperInterfaceType,
    events: ?Object,
    fire: Function
};

const event: EventHelperType = {
    events: undefined,
    app: undefined,
    init(app: $Application): boolean {
        const events = app.get("events");
        this.events = events;
        this.app = app;
        app.set("eventManager", this);
        console.info("[Event] Event Manager Initialized");
        return true;
    },
    destroy(): boolean {
        if (this.app) {
            this.app = undefined;
            this.events = undefined;
            return true;
        }
        return false;
    },
    async fire(name: string, ...args: any): Function | boolean {
        if (!this.events) {
            console.debug(`[Event] Events not defined, can't fire event for ${name}`);
        }
        if (this.events && isFunction(this.events[name])) {
            return this.events[name](...args);
        }
        return false;
    }
};

export default event;
