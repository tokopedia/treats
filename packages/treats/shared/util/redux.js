import merge from "lodash.merge";

export const mergeReduxState = (state1, state2) => {
    if (!state1) {
        return state2;
    } else if (!state2) {
        return state1;
    }
    return merge(state1, state2);
};

export const typeGenerator = (name, type) => `${name !== "" ? `${name}/` : ""}${type}`;

export const actionHandlerGenerator = (name, actionHandler) =>
    Object.keys(actionHandler).reduce((result, key) => {
        const actionType = typeGenerator(name, key);
        result[actionType] = actionHandler[key];
        return result;
    }, {});

export const reducerGenerator = (name = "", defaultActionHandler, initialState) => {
    /* Memoize the action handler so we won't generate it again every reducer call */
    const actionHandler = actionHandlerGenerator(name, defaultActionHandler);
    /* Return the reducer */
    return (state = initialState, action) =>
        actionHandler[action.type] ? actionHandler[action.type](state, action) : state;
};

export const actionCreatorGenerator = (name, actionCreators, params) =>
    Object.keys(actionCreators).reduce((result, key) => {
        result[key] = actionCreators[key](name, params);
        return result;
    }, {});
