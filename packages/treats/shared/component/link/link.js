// @flow
import type { Node } from "react";
import React from "react";
import { Link as LinkLib } from "react-router-dom";
import { isPushEnabled } from "@treats/util/location";

export type PropsType = {|
    href: string,
    onClick?: Function,
    className?: string,
    children?: Node,
    isPush?: boolean,
    isRedirect?: boolean
|};

type DerivativePropsType = {
    href: string,
    onClick?: Function,
    className?: string,
    children?: Node
};

const createLink = ({ children, href, ...props }: DerivativePropsType): Node => (
    <LinkLib to={href} {...props}>
        {children}
    </LinkLib>
);

createLink.defaultProps = {
    onClick: undefined,
    className: undefined,
    children: undefined
};

const createAnchor = ({ children, ...props }: DerivativePropsType): Node => (
    <a {...props}>{children}</a>
);

createAnchor.defaultProps = {
    onClick: undefined,
    className: undefined,
    children: undefined
};

/**
 * A component for displaying smart link, if route exist in app will SPA, else will redirect
 * @param props React props
 * @param props.href URL/link to be added on the component
 * @param props.onClick Function that will be called when component is clicked
 * @param props.className Class name to be added for the component
 * @param props.children React children of the component
 * @param props.isPush Flag to always render Link as react-router Link component for SPA
 * @param props.isRedirect Flag to always render Link as anchor component to redirect to other apps
 * @author Felix Tan
 */
const Link = (props: PropsType): Node => {
    const { isPush, isRedirect, ...remainingProps } = props;
    if (isPush) {
        return createLink(remainingProps);
    } else if (isRedirect) {
        return createAnchor(remainingProps);
    }
    return isPushEnabled(props.href) ? createLink(remainingProps) : createAnchor(remainingProps);
};

Link.defaultProps = {
    onClick: undefined,
    className: undefined,
    children: undefined,
    isPush: false,
    isRedirect: false
};

export default Link;
