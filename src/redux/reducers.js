let initialState = "";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_CELL":
      return { ...state };

    default:
      return state;
  }
};
