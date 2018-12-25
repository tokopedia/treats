import { isPushEnabled } from "./location";

jest.mock("@@BUILD_ROUTE_PATH@@");

describe("util/location", () => {
    describe("isPushEnabled", () => {
        const input = {
                routeExist: "/test",
                routeExistIsPushFalse: "/test/q/st",
                routeExistQueryString: "/test?q=product&st=product",
                routeNotExist: "/not-exist",
                routePartiallyExist: "/test/product"
            },
            output = {
                routeExist: true,
                routeExistIsPushFalse: false,
                routeExistQueryString: true,
                routeNotExist: false,
                routePartiallyExist: false
            };

        Object.keys(input).forEach(key => {
            it(`${key} | should check if path exist in global routes`, () => {
                expect(isPushEnabled(input[key])).toBe(output[key]);
            });
        });
    });
});
