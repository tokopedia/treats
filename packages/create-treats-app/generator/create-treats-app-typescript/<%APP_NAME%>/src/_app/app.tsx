import React, { Component, Fragment } from "react";
import Helmet from "@treats/helmet";
import { Route, Switch, withRouter } from "react-router-dom";
import { hot } from "react-hot-loader";
import routes from "@treats/route";
import { findActiveRoute, getURLfromLocation } from "@treats/util/location";
import "./app.css";

type PropsType = {
    location: any,
    language: any
};

type StateType = {
    activeModule: string,
    activeTemplate: string
}

class App extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const { location } = props,
            activeRoute = findActiveRoute(location.pathname);

        this.state = {
            activeModule: (activeRoute && activeRoute.name) || "",
            activeTemplate: (activeRoute && activeRoute.template) || "default"
        };
    }

    componentWillReceiveProps(nextProps: PropsType) {
        const { location: prevLocation } = this.props,
            { location: nextLocation } = nextProps;
        if (nextLocation.pathname !== prevLocation.pathname) {
            const activeRoute = findActiveRoute(nextLocation.pathname);

            if (activeRoute) {
                const activeTemplate = activeRoute.template || "default";
                if (
                    window &&
                    (activeRoute.isPush === false || activeTemplate !== this.state.activeTemplate)
                ) {
                    window.location.href = getURLfromLocation(nextLocation);
                } else {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            }

            this.setState({
                ...this.state,
                activeModule: (activeRoute && activeRoute.name) || this.state.activeModule,
                activeTemplate: (activeRoute && activeRoute.template) || this.state.activeTemplate
            });
        }
    }

    shouldComponentUpdate(nextProps: PropsType) {
        const { location: prevLocation } = this.props,
            { location: nextLocation } = nextProps;
        if (nextLocation.pathname !== prevLocation.pathname) {
            const activeRoute = findActiveRoute(nextLocation.pathname),
                activeTemplate = activeRoute.template || "default";
            if (
                !activeRoute ||
                activeRoute.isPush === false ||
                activeTemplate !== this.state.activeTemplate
            ) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { location, language } = this.props;
        return (
            <Fragment>
                <Helmet>
                    <html lang={language} />
                </Helmet>
                <Switch location={location}>
                    {routes.map((entry, index) => (
                        <Route key={`${entry.path}-${index}`} {...entry} />
                    ))}
                </Switch>
            </Fragment>
        );
    }
}

export default hot(module)(withRouter(App));
