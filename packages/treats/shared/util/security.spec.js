import { deserializeJSON, escapeHtml, escapeHtmlQueryObject } from "./security";

describe("util/security", () => {
    describe("deserializeJSON", () => {
        const input = {
                serializedJSON:
                    '{"image_url_700":"http:\u002F\u002Fexample.com\u002Fimg\u002Fcache\u002F700\u002Fproduct-1\u002F2016\u002F12\u002F9\u002F33828\u002F33828_655b0886-c379-4f32-b295-96131a2c5215.jpg","price":"Rp 1.500","courier_count":9,"condition":1,"labels":[],"badges":[],"is_featured":0,"rating":0,"original_price":"Rp 0","discount_expired":null}'
            },
            output = {
                serializedJSON: {
                    badges: [],
                    condition: 1,
                    courier_count: 9,
                    discount_expired: null,
                    image_url_700:
                        "http://example.com/img/cache/700/product-1/2016/12/9/33828/33828_655b0886-c379-4f32-b295-96131a2c5215.jpg",
                    is_featured: 0,
                    labels: [],
                    original_price: "Rp 0",
                    price: "Rp 1.500",
                    rating: 0
                }
            },
            invalidInput = { undefined, NaN, emptyString: "" };

        Object.keys(invalidInput).forEach(key => {
            it(`${key} | ${
                invalidInput[key]
            } should deserialized into self because invalid`, () => {
                expect(deserializeJSON(invalidInput[key])).toEqual(invalidInput[key]);
            });
        });

        Object.keys(input).forEach(key => {
            it(`${key} | ${invalidInput[key]} should deserialized because valid JSON`, () => {
                expect(deserializeJSON(input[key])).toEqual(output[key]);
            });
        });
    });

    describe("escapeHtml", () => {
        const input = {
                htmlTags: '<div><script>alert("XSS");</script></div>',
                xssAttempt1: '"><a><img+src=x+onerror=alert(1)></a>',
                xssAttempt2: "'\">><marquee><img src=x onerror=alert(1)></marquee>",
                xssAttempt3: '""+tess=""+<onclick>=alert(1)>'
            },
            output = {
                htmlTags:
                    "&lt;div&gt;&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt;&lt;/div&gt;",
                xssAttempt1: "&quot;&gt;&lt;a&gt;&lt;img+src=x+onerror=alert(1)&gt;&lt;/a&gt;",
                xssAttempt2:
                    "'&quot;&gt;&gt;&lt;marquee&gt;&lt;img src=x onerror=alert(1)&gt;&lt;/marquee&gt;",
                xssAttempt3: "&quot;&quot;+tess=&quot;&quot;+&lt;onclick&gt;=alert(1)&gt;"
            };
        Object.keys(input).forEach(key => {
            it(`${key} | ${input[key]} should be escaped`, () => {
                expect(escapeHtml(input[key])).toEqual(output[key]);
            });
        });
    });

    describe("escapeHtmlQueryObject", () => {
        const input = {
                st: "product",
                q: "'\">><marquee><img src=x onerror=alert(1)></marquee>",
                fcity: undefined,
                variants: NaN,
                number: 123
            },
            output = {
                st: "product",
                q:
                    "'&quot;&gt;&gt;&lt;marquee&gt;&lt;img src=x onerror=alert(1)&gt;&lt;/marquee&gt;",
                fcity: undefined,
                variants: NaN,
                number: 123
            },
            invalidInput = {
                undefined,
                string: "test",
                NaN,
                number: 123,
                array: ["test1", "test2", "test3"]
            };
        it("should escape HTML Query Object properly", () => {
            expect(escapeHtmlQueryObject(input)).toEqual(output);
        });

        Object.keys(invalidInput).forEach(key => {
            it(`${key} | invalid input should returns self`, () => {
                expect(escapeHtmlQueryObject(invalidInput[key])).toEqual(invalidInput[key]);
            });
        });
    });
});
