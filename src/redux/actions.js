export function switchView(user) {
  return {
    type: "SWITCH_VIEW",
    payload: user,
  };
}
export function editCell(data) {
  return {
    type: "EDIT_CELL",
    payload: data,
  };
}
export function addRowUp() {
  return {
    type: "ADD_ROW_UP",
  };
}
export function addRowDown() {
  return {
    type: "ADD_ROW_DOWN",
  };
}
export function addColumnLeft() {
  return {
    type: "ADD_COLUMN_LEFT",
  };
}
export function addColumnRight() {
  return {
    type: "ADD_COLUMN_RIGHT",
  };
}
