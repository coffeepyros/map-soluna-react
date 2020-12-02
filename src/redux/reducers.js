import { playerMapData, gmMapData } from "../mapData";
let initialState = [...playerMapData];

export const reducer = (state = initialState, action) => {
  let newState, nrOfColumns;

  switch (action.type) {
    case "SWITCH_VIEW":
      if (action.payload === "gm") return [...gmMapData];
      else if (action.payload === "player") return [...playerMapData];
      else return state;

    case "EDIT_CELL":
      // new State is a copy of the old state
      newState = [...state];
      // Only the specific cell is changed to the new data
      // (because order in array is important)
      newState[action.payload.colIndex].data[action.payload.cellIndex] = {
        x: newState[action.payload.colIndex].data[action.payload.cellIndex].x,
        y: newState[action.payload.colIndex].data[action.payload.cellIndex].y,
        label: action.payload.label,
        terrain: action.payload.terrain,
        notes: action.payload.notes,
      };
      return newState;

    case "ADD_ROW_UP":
      newState = [...state];
      let firstRowCell = newState[0].data[0];
      nrOfColumns = newState.length;
      for (let i = 0; i < nrOfColumns; i++) {
        let newCellData = {
          x: newState[i].data[0].x,
          y: firstRowCell.y - 1,
          label: "",
          terrain: "",
          notes: "",
        };
        newState[i] = {
          col_ID: newState[i].col_ID,
          data: [newCellData, ...newState[i].data],
        };
      }
      return newState;

    case "ADD_ROW_DOWN":
      newState = [...state];
      let lastRowCell = newState[0].data[newState[0].data.length - 1];
      nrOfColumns = newState.length;
      for (let i = 0; i < nrOfColumns; i++) {
        let newCellData = {
          x: newState[i].data[0].x,
          y: lastRowCell.y + 1,
          label: "",
          terrain: "",
          notes: "",
        };
        newState[i] = {
          col_ID: newState[i].col_ID,
          data: [...newState[i].data, newCellData],
        };
      }
      return newState;

    case "ADD_COLUMN_LEFT":
      newState = [...state];
      let firstColID = newState[0].col_ID;
      // adding two columns so the hex-field structure isn't destroyed
      for (let i = 1; i < 3; i++) {
        let newCellData = [];
        for (let j = 0; j < newState[0].data.length; j++) {
          newCellData.push({
            x: firstColID - i,
            y: newState[0].data[j].y,
            label: "",
            terrain: "",
            notes: "",
          });
        }
        newState = [
          {
            col_ID: firstColID - i,
            data: newCellData,
          },
          ...newState,
        ];
      }
      return newState;

    case "ADD_COLUMN_RIGHT":
      newState = [...state];
      let lastColID = newState[newState.length - 1].col_ID;
      // adding two columns so the hex-field structure isn't destroyed
      for (let i = 1; i < 3; i++) {
        let newCellData = [];
        for (let j = 0; j < newState[0].data.length; j++) {
          newCellData.push({
            x: lastColID + i,
            y: newState[0].data[j].y,
            label: "",
            terrain: "",
            notes: "",
          });
        }
        newState = [
          ...newState,
          {
            col_ID: lastColID + i,
            data: newCellData,
          },
        ];
      }
      return newState;

    default:
      return state;
  }
};
