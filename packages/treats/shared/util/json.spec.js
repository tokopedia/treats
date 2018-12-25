import { injectParam, bindParams } from "./json";

describe("util/json", () => {
    describe("injectParam", () => {
        const input = {
                templateString: ["test ${value}", { value: "test2" }],
                noParam: ["test ${value}", {}],
                undefinedParam: ["test ${value}"],
                undefined: [undefined]
            },
            output = {
                templateString: "test test2",
                noParam: "test ${value}",
                undefinedParam: "test ${value}",
                undefined: ""
            };

        Object.keys(input).forEach(key => {
            it(`${key} | should inject parameter to string correctly`, () => {
                expect(injectParam(...input[key])).toEqual(output[key]);
            });
        });
    });

    describe("bindParams", () => {
        const input = {
                flatObject: [
                    { test: "test ${value}", testtwo: "test ${value} ${value2}" },
                    { value: "value", value2: "value2" }
                ],
                arrayObject: [
                    {
                        test: "test ${value}",
                        testtwo: ["test ${value} ${value2}", "test ${value2}"]
                    },
                    { value: "value", value2: "value2" }
                ],
                deepObject: [
                    {
                        test: "test ${value}",
                        testtwo: {
                            testthree: ["test ${value}", { testfour: "test ${value2}" }]
                        }
                    },
                    { value: "value", value2: "value2" }
                ],
                null: [
                    {
                        test: "test ${value}",
                        testtwo: {
                            testthree: ["test ${value}", { testfour: null }]
                        }
                    },
                    { value: "value", value2: "value2" }
                ]
            },
            output = {
                flatObject: { test: "test value", testtwo: "test value value2" },
                arrayObject: { test: "test value", testtwo: ["test value value2", "test value2"] },
                deepObject: {
                    test: "test value",
                    testtwo: { testthree: ["test value", { testfour: "test value2" }] }
                },
                null: {
                    test: "test value",
                    testtwo: { testthree: ["test value", { testfour: null }] }
                }
            };

        Object.keys(input).forEach(key => {
            it(`${key} | should bind params to json template object correctly`, () => {
                expect(bindParams(...input[key])).toEqual(output[key]);
            });
        });
    });
});
