// @flow
import * as React from "react";

export type LocationType = {
    pathname: string,
    search: string
};

export type MatchType = {};

export type URLObjectType = {
    protocol: ?string,
    hostname: ?string,
    port: ?string,
    pathname: ?string,
    searchParams: ?string
};

export type RouteType = {
    name: string,
    path: string,
    component: React.Node
};
