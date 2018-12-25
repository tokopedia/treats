/* reducer.js */

const initialState = {
    term: "",
    item: []
};
  
const TodoReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "ADD_TODO":
        return {
            ...state,
            term: "",
            history: state.item.push(state.term)
        };
    default:
      return state;
  }
};
  
export default TodoReducer;
