import Todo from "@page/todo";
import Profile from "@page/profile-page";

import { TODO, PROFILE } from "./path";

const module = {
    [TODO]: Todo,
    [PROFILE]: Profile
};

export default module;
