import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = {};

    componentDidCatch(error) {
        const { onErrorSignal, onError } = this.props;
        this.setState({
            error
        });
        if (onError) {
            onError(error);
        }

        if (onErrorSignal) {
            onErrorSignal();
        }
    }

    render() {
        const { error } = this.state,
            { children, placeholder: Placeholder, onErrorSignal } = this.props;

        if (process.env.BUILD_TARGET === "server") {
            try {
                const __html = require("react-dom/server").renderToStaticMarkup(children);
                return <div dangerouslySetInnerHTML={{ __html }} />;
            } catch (e) {
                onErrorSignal();
                return Placeholder ? <Placeholder error={e} /> : <span>{e.toString()}</span>;
            }
        }

        if (error) {
            return Placeholder ? <Placeholder error={error} /> : <span>{error.toString()}</span>;
        }

        return <div>{children}</div>;
    }
}

export default ErrorBoundary;
