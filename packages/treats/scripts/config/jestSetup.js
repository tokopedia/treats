import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, render, mount } from "enzyme";
import {
    mountWithIntl,
    shallowWithIntl,
    renderWithIntl,
    loadTranslationObject
} from "enzyme-react-intl";
import { shallowToJson, renderToJson, mountToJson } from "enzyme-to-json";
import locale from "@@BUILD_LOCALE_PATH@@";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing

global.shallow = shallow;
global.render = render;
global.mount = mount;

loadTranslationObject(locale);
global.mountWithIntl = mountWithIntl;
global.shallowWithIntl = shallowWithIntl;
global.renderWithIntl = renderWithIntl;

global.shallowToJson = shallowToJson;
global.renderToJson = renderToJson;
global.mountToJson = mountToJson;

jest.mock("treats");
