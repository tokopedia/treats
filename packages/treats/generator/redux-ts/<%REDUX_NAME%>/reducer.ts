import initialState from "./initial-state";
import types from "./type";

/**
 * An action handler for handling <%REDUX_NAME%>.
 */
const <%REDUX_NAME_VAR%>ActionHandlers = {<%if(REDUX_THUNKS && REDUX_THUNKS.length > 0)%><%for(let i=0; i< REDUX_THUNKS.length; i++)%>
    [types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_LOADING"]]: state => {
        /** YOUR CODE GOES HERE FOR <%REDUX_THUNKS[i]%> Loading*/
        return state;
    },
    [types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_ERROR"]]: state => {
        /** YOUR CODE GOES HERE FOR <%REDUX_THUNKS[i]%> Error*/
        return state;
    },
    [types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_SUCCESS"]]: state => {
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
const <%REDUX_NAME_VAR%>Reducer = (state = initialState, action) =>
    <%REDUX_NAME_VAR%>ActionHandlers[action.type] ? <%REDUX_NAME_VAR%>ActionHandlers[action.type](state, action) : state;

export default <%REDUX_NAME_VAR%>Reducer;
