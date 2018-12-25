import { combineReducers } from "@treats/redux";

import ReduxpageReducer from "./reduxpage";
import TodoReducer from "./todo";

export default combineReducers({
    reduxpage: ReduxpageReducer,
    todo: TodoReducer
});
