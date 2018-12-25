import { camelToKebabCase } from "./string";

describe("util/string", () => {
    describe("camelToKebabCase", () => {
        const input = {
                camelCase: "testTest",
                crazySymbols: "test/!!@#$%^&**()-TestTest",
                kebabCase: "test-test",
                numbered: "1Test",
                number: 123456,
                undefined,
                NaN
            },
            output = {
                camelCase: "test-test",
                crazySymbols: "test/!!@#$%^&**()--test-test",
                kebabCase: "test-test",
                numbered: "1-test",
                number: 123456,
                undefined,
                NaN
            };

        Object.keys(input).forEach(key => {
            it(`${key} | ${input[key]} should returns ${output[key]}`, () => {
                expect(camelToKebabCase(input[key])).toEqual(output[key]);
            });
        });
    });
});
