const types = {<%if(REDUX_THUNKS && REDUX_THUNKS.length > 0)%><%for(let i =0; i< REDUX_THUNKS.length; i++)%>
    "<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_LOADING": "<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_LOADING",
    "<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_ERROR": "<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_ERROR",
    "<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_SUCCESS": "<%REDUX_NAME_VAR.toUpperCase()%>/<%REDUX_THUNKS[i].toUpperCase()%>_SUCCESS",<%endfor%><%endif%>
    "SET_INITIAL_<%REDUX_NAME_VAR.toUpperCase()%>": "SET_INITIAL_<%REDUX_NAME_VAR.toUpperCase()%>"
};

export default types;
