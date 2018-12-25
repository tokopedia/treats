import { isArray, isString, isObject, isNumber } from "./typecheck";

describe("util/typecheck", () => {
    describe("isArray", () => {
        const invalidValues = {
            integer: 6,
            string: "test",
            object: { test: "test" },
            float: 0.6,
            undef: undefined,
            NaN,
            null: null
        };

        it("should return true if value is array", () => {
            const emptyArray = [],
                filledArray = [1, 2, 3, 4];

            expect(isArray(emptyArray)).toEqual(true);
            expect(isArray(filledArray)).toEqual(true);
        });

        Object.keys(invalidValues).forEach(key => {
            it(`${key} should return false`, () => {
                expect(isArray(invalidValues[key])).toEqual(false);
            });
        });
    });

    describe("isString", () => {
        const invalidValues = {
            integer: 6,
            array: ["test"],
            object: { test: "test" },
            float: 0.6,
            undef: undefined,
            NaN,
            null: null
        };

        it("should return true if value is string", () => {
            const emptyString = "",
                string = "test";

            expect(isString(emptyString)).toEqual(true);
            expect(isString(string)).toEqual(true);
        });

        Object.keys(invalidValues).forEach(key => {
            it(`${key} should return false`, () => {
                expect(isString(invalidValues[key])).toEqual(false);
            });
        });
    });

    describe("isObject", () => {
        const input = {
                object: { test: "test" },
                null: null,
                undefined,
                NaN,
                string: "test",
                integer: 123,
                float: 0.25,
                array: ["test1", "test2", 123]
            },
            output = {
                object: true,
                null: false,
                undefined: false,
                NaN: false,
                string: false,
                integer: false,
                float: false,
                array: false
            };

        Object.keys(input).forEach(key => {
            it(`${key} | should returns ${output[key]}`, () => {
                expect(isObject(input[key])).toEqual(output[key]);
            });
        });
    });

    describe("isNumber", () => {
        const input = {
                integer: 12123,
                float: 0.25,
                string: "0123123",
                boolean: true,
                undefined,
                NaN,
                null: null
            },
            output = {
                integer: true,
                float: true,
                string: false,
                boolean: false,
                undefined: false,
                NaN: false,
                null: false
            };

        Object.keys(input).forEach(key => {
            it(`${key} | should returns ${output[key]}`, () => {
                expect(isNumber(input[key])).toEqual(output[key]);
            });
        });
    });
});
