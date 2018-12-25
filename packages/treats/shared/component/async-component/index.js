import { hot } from "react-hot-loader";

const AsyncComponent = (componentModule, component, opts) => hot(componentModule, opts)(component);

export default AsyncComponent;
