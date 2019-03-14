import initialState from "./initial-state";
import types from "./type";

/**
 * An action handler for handling profile.
 */
const profileActionHandlers = {
    [types.SET_INITIAL_PROFILE]: () => initialState,
    [types.UPDATE_NAME]: (state, action) => ({
        ...state,
        name: action.name
    }),
    [types.UPDATE_NATION]: (state, action) => ({
        ...state,
        nation: action.nation
    }),
    [types.GET_COUNTRIES_LOADING]: state => ({
        ...state,
        countries: {
            status: "loading",
            data: []
        }
    }),
    [types.GET_COUNTRIES_SUCCESS]: (state, action) => ({
        ...state,
        countries: {
            status: "success",
            data: action.response
        }
    }),
    [types.GET_COUNTRIES_ERROR]: state => ({
        ...state,
        countries: {
            status: "error",
            data: []
        }
    })
};

/**
 * The profile reducer function.
 * @param state the Redux state
 * @param action action being dispatched
 */
const profileReducer = (state = initialState, action) =>
    profileActionHandlers[action.type] ? profileActionHandlers[action.type](state, action) : state;

export default profileReducer;
