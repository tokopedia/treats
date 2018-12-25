import React from "react";
import { MemoryRouter } from "react-router-dom";
import Link from "./link";

describe("component/common/link", () => {
    let output;
    const handleClick = jest.fn();

    describe("when isPush props is available", () => {
        // it("should pass snapshot test", () => {
        //     const renderOutput = render(
        //         <MemoryRouter>
        //             <Link href="www.example.com" onClick={handleClick} isPush>
        //                 <span>Children</span>
        //             </Link>
        //         </MemoryRouter>
        //     );
        //     expect(renderOutput).toMatchSnapshot();
        // });
        beforeEach(() => {
            output = shallow(
                <Link href="www.example.com" onClick={handleClick} isPush>
                    <span>Children</span>
                </Link>
            );
        });

        it("should contain the correct link", () => {
            expect(output.prop("to")).toEqual("www.example.com");
        });

        it("should render children as it is", () => {
            expect(output.find("span").length).toEqual(1);
            expect(output.find("span").text()).toEqual("Children");
        });

        it("should run the function when clicked", () => {
            output.simulate("click");
            expect(handleClick).toHaveBeenCalled();
        });
    });

    describe("when isRedirect props is available", () => {
        beforeEach(() => {
            output = shallow(
                <Link href="www.example.com" onClick={handleClick} isRedirect>
                    <span>Children</span>
                </Link>
            );
        });

        it("should contain the correct link", () => {
            expect(output.prop("href")).toEqual("www.example.com");
        });

        it("should render children as it is", () => {
            expect(output.find("span").length).toEqual(1);
            expect(output.find("span").text()).toEqual("Children");
        });

        it("should run the function when clicked", () => {
            output.simulate("click");
            expect(handleClick).toHaveBeenCalled();
        });
    });
});
