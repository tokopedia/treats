//@flow
import type { $Application } from "express";

export type HelperInterfaceType = {
    app: ?$Application,
    init: Function
};
