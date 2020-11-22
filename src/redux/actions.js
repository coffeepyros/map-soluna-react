export function editCell(data) {
  return {
    type: "EDIT_CELL",
    payload: data,
  };
}
export function switchUser(user) {
  return {
    type: "SWITCH_USER",
    payload: user,
  };
}
