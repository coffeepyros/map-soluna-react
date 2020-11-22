import { mapData } from "../mapData";

export const reducer = (state = mapData, action) => {
  switch (action.type) {
    case "EDIT_CELL":
      let newState = [...state];
      newState[action.payload.colIndex].data[action.payload.cellIndex] = {
        x: newState[action.payload.colIndex].data[action.payload.cellIndex].x,
        y: newState[action.payload.colIndex].data[action.payload.cellIndex].y,
        label: action.payload.label,
        terrain: action.payload.terrain,
        notes: action.payload.notes,
      };
      return newState;

    default:
      return state;
  }
};
