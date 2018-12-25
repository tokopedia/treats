import React from "react";

describe("<%TEST_NAME%>", () => {
    <%if(TEST_DESCRIPTION && TEST_DESCRIPTION.length > 0)%><%for(let i=0; i< TEST_DESCRIPTION.length; i++)%>
    it("<%TEST_DESCRIPTION[i]%>", () => {
        /** YOUR TEST GOES HERE */
    });
    <%endfor%><%endif%>
});
