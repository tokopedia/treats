import initialState, { StateType } from "./initial-state";
import types from "./type";

/**
 * An action handler for handling <%REDUX_NAME%>.
 */
const <%REDUX_NAME_VAR%>ActionHandlers = {<%if(REDUX_THUNKS && REDUX_THUNKS.length > 0)%><%for(let i=0; i< REDUX_THUNKS.length; i++)%>
    [types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_LOADING"]]: (state: StateType, action: any) => {
        /** YOUR CODE GOES HERE FOR <%REDUX_THUNKS[i]%> Loading*/
        return state;
    },
    [types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_ERROR"]]: (state: StateType, action: any) => {
        /** YOUR CODE GOES HERE FOR <%REDUX_THUNKS[i]%> Error*/
        return state;
    },
    [types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_SUCCESS"]]: (state: StateType, action: any) => {
        /** YOUR CODE GOES HERE FOR <%REDUX_THUNKS[i]%> Success*/
        return state;
    },<%endfor%><%endif%>
    [types.SET_INITIAL_<%REDUX_NAME_VAR.toUpperCase()%>]: () => initialState
};

/**
 * The <%REDUX_NAME%> reducer function.
 * @param state the Redux state
 * @param action action being dispatched
 */
const <%REDUX_NAME_VAR%>Reducer = (state: StateType = initialState, action: any) =>
    <%REDUX_NAME_VAR%>ActionHandlers[action.type] ? <%REDUX_NAME_VAR%>ActionHandlers[action.type](state, action) : state;

export default <%REDUX_NAME_VAR%>Reducer;
