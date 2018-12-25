/* reducer.js */

const initialState = {
    age: 20,
    history: []
};
  
const ReduxpageReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "AGE_UP":
      return {
        ...state,
        age: state.age + action.value,
        history: state.history.concat({ id: Math.random(), age: state.age + action.value })
      };
    case "AGE_DOWN":
      return {
        ...state,
        age: state.age - action.value,
        history: state.history.concat({ id: Math.random(), age: state.age - action.value })
      };
    case "DEL_ENTRY":
      return {
        ...state,
        history: newState.history.filter((el)=> el.id !== action.id )
      }
    default:
      return state;
  }
};
  
export default ReduxpageReducer;
