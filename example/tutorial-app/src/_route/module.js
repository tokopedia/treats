import Welcome from "@page/welcome";
import MyPage from "@page/mypage";
import Todo from "@page/todo";
import ReduxPage from "@page/reduxpage";
import TodoGraphqlPage from "@page/todographql";

import { WELCOME, MYPAGE, TODO, REDUXPAGE, TODOGRAPHQL } from "./path";

const module = {
    [WELCOME]: Welcome,
    [MYPAGE]: MyPage,
    [TODO]: Todo,
    [REDUXPAGE]: ReduxPage,
    [TODOGRAPHQL]: TodoGraphqlPage
};

export default module;
