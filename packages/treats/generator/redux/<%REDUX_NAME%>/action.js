import types from "./type";
<%if(REDUX_THUNKS && REDUX_THUNKS.length > 0)%><%for(let i=0; i< REDUX_THUNKS.length; i++)%>
/**
 * An action creator for setting <%REDUX_THUNKS[i]%> loading state.
 * @private
 */
const <%REDUX_THUNKS[i]%>Loading = () => ({
    type: types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_LOADING"]
});

/**
 * An action creator for setting <%REDUX_THUNKS[i]%> error state.
 * @private
 */
const <%REDUX_THUNKS[i]%>Error = () => ({
    type: types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_ERROR"]
});

/**
 * An action creator for setting <%REDUX_THUNKS[i]%> success state.
 * @private
 */
const <%REDUX_THUNKS[i]%>Success = () => ({
    type: types["<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_SUCCESS"]
});

/**
 * A thunk to dispatch actions for <%REDUX_THUNKS[i]%>
 * @public
 */
const <%REDUX_THUNKS[i]%> = () => (dispatch, getState) => {
    /** Your thunk code for "<%REDUX_THUNKS[i]%>" goes here */
    dispatch(<%REDUX_THUNKS[i]%>Loading());
    const <%REDUX_THUNKS[i]%>Promise = new Promise()
        .then(response => {
            dispatch(<%REDUX_THUNKS[i]%>Success(response));
        })
        .catch(err => {
            console.error("[<%REDUX_THUNKS[i]%>] <%REDUX_THUNKS[i]%> Error");
            console.error(err);
            dispatch(<%REDUX_THUNKS[i]%>Error());
        });

    return <%REDUX_THUNKS[i]%>Promise;
};
<%endfor%><%endif%>
/**
 * An action creator for setting <%REDUX_NAME%> to initial state.
 * @public
 */
const setInitialState<%REDUX_NAME_VAR%> = () => ({
    type: types["SET_INITIAL_<%REDUX_NAME_VAR.toUpperCase()%>"]
});

export default {
    <%if(REDUX_THUNKS && REDUX_THUNKS.length > 0)%><%for(let i=0; i< REDUX_THUNKS.length; i++)%><%REDUX_THUNKS[i]%>,
    <%endfor%><%endif%>setInitialState<%REDUX_NAME_VAR%>
};
