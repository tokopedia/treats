import { combineReducers } from "@treats/redux";

import ProfileReducer from "../redux/profile";

export default combineReducers({
    profile: ProfileReducer,
});