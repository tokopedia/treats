import React<%if(COMPONENT_TYPE === "ClassComponent")%>, { Component }<%elsif(COMPONENT_TYPE === "ClassPureComponent")%>, { PureComponent }<%endif%> from "react";
<%if(CODE_SPLIT)%>import AsyncComponent from "@treats/component/async-component";<%endif%>
<%if(COMPONENT_WITH_REDUX)%>import { connect } from "@treats/redux";<%endif%>
import style from "./<%COMPONENT_NAME%>.css";

<%if(COMPONENT_PROPS && COMPONENT_PROPS.length > 0)%>
type PropsType = {
    <%for(let i=0; i< COMPONENT_PROPS.length; i++)%><%COMPONENT_PROPS[i]%>: any;
    <%endfor%>
};
<%endif%>

/**
*  <%COMPONENT_DESCRIPTION%><%if(COMPONENT_PROPS && COMPONENT_PROPS.length > 0)%>
* @param props React props<%for(let i=0; i< COMPONENT_PROPS.length; i++)%>
* @param props.<%COMPONENT_PROPS[i]%><%endfor%><%endif%>
* 
*/<%if(COMPONENT_TYPE === "ClassComponent" || COMPONENT_TYPE === "ClassPureComponent")%>
class <%COMPONENT_NAME_VAR%> extends <%if(COMPONENT_TYPE === "ClassComponent")%>Component<%elsif(COMPONENT_TYPE === "ClassPureComponent")%>PureComponent<%endif%><%if(COMPONENT_PROPS && COMPONENT_PROPS.length > 0)%><PropsType><%endif%> {
    render() {
        <%if(COMPONENT_PROPS && COMPONENT_PROPS.length > 0)%>const { <%COMPONENT_PROPS.join(", ")%> } = this.props<%endif%>
        return(
            <div>**Your Component Code Goes Here**</div>
        )
    }
}
<%else%>
const <%COMPONENT_NAME_VAR%> = (<%if(COMPONENT_PROPS && COMPONENT_PROPS.length > 0)%>{ <%COMPONENT_PROPS.join(", ")%> }: PropsType<%endif%>) => (
    <div>**Your Component Code Goes Here**</div>
);
<%endif%><%if(COMPONENT_WITH_REDUX)%>
const mapStateToProps = (state: any) => ({
    /** YOUR MAP STATE TO PROPS FUNCTION */
});
const mapDispatchToProps = (dispatch: Function) => ({
    /** YOUR MAP DISPATCH TO PROPS FUNCTION */
});
<%endif%>
<%if(CODE_SPLIT)%>export default AsyncComponent(module, <%if(COMPONENT_WITH_REDUX)%>connect(mapStateToProps,mapDispatchToProps)(<%COMPONENT_NAME_VAR%>)<%else%><%COMPONENT_NAME_VAR%><%endif%>);<%else%>export default <%if(COMPONENT_WITH_REDUX)%>connect(mapStateToProps,mapDispatchToProps)(<%COMPONENT_NAME_VAR%>)<%else%><%COMPONENT_NAME_VAR%><%endif%>;<%endif%></PropsType>
