

declare module "@treats/component/async-component" {
    const component: Function;
    export default component;
}

declare module "@treats/component/async-loader" {
    const component: Function;
    export default component;
}

declare module "@treats/component/error-boundary" {
    import * as React from "react";

    export const withErrorBoundary: Function;
    const component: React.Node;
    export default component;
}

declare module "@treats/component/http-status" {
    import * as React from "react";

    const component: React.Node;
    export default component;
}

declare module "@treats/component/link" {
    import * as React from "react";

    const component: React.Node;
    export default component;
}

declare module "@treats/component/provider" {
    import * as React from "react";

    const component: React.Node;
    export default component;
}

declare module "@treats/component/redirect" {
    import * as React from "react";

    const component: React.Node;
    export default component;
}
