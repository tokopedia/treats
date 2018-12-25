import React from "react";
import ErrorBoundary from "./error-boundary";

export const withErrorBoundary = ({ component: Component, placeholder, onError }) => props => (
    <ErrorBoundary placeholder={placeholder} onError={onError}>
        <Component {...props} />
    </ErrorBoundary>
);

export default ErrorBoundary;
