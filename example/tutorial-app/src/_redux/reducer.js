import { combineReducers } from "@treats/redux";

import ProfileReducer from "../redux/profile-page";

export default combineReducers({
    profile: ProfileReducer
});