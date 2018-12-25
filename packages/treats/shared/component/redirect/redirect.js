// @flow
import React from "react";
import { Route, Redirect as RedirectLib } from "react-router-dom";

import { isPushEnabled } from "@treats/util/location";

type PropsType = {
    from: string,
    to: string,
    status: number,
    exclude: string
};

const Redirect = ({ from, to, status }: PropsType): Route => (
    <Route
        render={({ staticContext }: Object): RedirectLib | null => {
            if (process.env.BUILD_TARGET === "server" && staticContext) {
                staticContext.status = status;
            } else {
                const routeExist = isPushEnabled(to);
                if (!routeExist) {
                    window.location.replace(to);
                    return null;
                }
            }
            return <RedirectLib from={from} to={to} />;
        }}
    />
);

export default Redirect;
