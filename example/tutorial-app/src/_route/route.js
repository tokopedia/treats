import { WELCOME, MYPAGE, TODO, REDUXPAGE, TODOGRAPHQL } from "./path";

const route = [
    {
        name: "welcome",
        path: WELCOME,
        exact: true,
        disabled: true
    },
    {
        name: "mypage",
        path: MYPAGE,
        exact: true,
        disabled: true
    },
    {
        name: "todo",
        path: TODO,
        exact: true,
        disabled: true
    },
    {
        name: "redux",
        path: REDUXPAGE,
        exact: true,
        
    },
    {
        name: "todographql",
        path:  TODOGRAPHQL,
        exact: true  
    }
];

export default route;
