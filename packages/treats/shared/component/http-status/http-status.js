import React from "react";
import { Route } from "react-router-dom";

const HTTPStatus = ({ status, children }) => (
    <Route
        render={({ staticContext }) => {
            if (staticContext) {
                staticContext.status = status;
            }
            return children;
        }}
    />
);

export default HTTPStatus;
