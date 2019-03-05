import React from "react";

const LoadingComponent = props => {
    const { options, error, pastDelay } = props;
    if (error) {
        return (options && options.errorPlaceholder) || <div>Error!</div>;
    } else if (pastDelay) {
        return (options && options.loadingPlaceholder) || <div>Loading...</div>;
    }

    return null;
};

export default LoadingComponent;
