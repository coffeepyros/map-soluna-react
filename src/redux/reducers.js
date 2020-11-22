import { playerMapData, gmMapData } from "../mapData";
let initialState = [...playerMapData];

export const reducer = (state = initialState, action) => {
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

    case "SWITCH_USER":
      if (action.payload === "gm") return [...gmMapData];
      else if (action.payload === "player") return [...playerMapData];
      else return state;

    default:
      return state;
  }
};
