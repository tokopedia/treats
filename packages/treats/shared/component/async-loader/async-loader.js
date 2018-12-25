import React from "react";
import universal from "react-universal-component";

const AsyncLoader = ({ component, options }) =>
    universal(component, {
        loadingTransition: false,
        timeout: 36000,
        minDelay: 500,
        alwaysDelay: true,
        ...options,
        error: (options && options.errorPlaceholder) || <div>Error!</div>,
        loading: (options && options.loadingPlaceholder) || <div>Loading....</div>
    });

export default AsyncLoader;
