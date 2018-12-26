<% if(CODE_SPLIT) %>import AsyncLoader from "@treats/component/async-loader";

const <%COMPONENT_NAME_VAR%> = AsyncLoader({ component: import("./<%COMPONENT_NAME%>") });
<% else %>import <%COMPONENT_NAME_VAR%> from "./<%COMPONENT_NAME%>";
<% endif %>
export default <%COMPONENT_NAME_VAR%>;
