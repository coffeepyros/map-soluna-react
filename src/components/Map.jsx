import React from "react";
import Cell from "./Cell";

export default function Map() {
  let array = [1, 2, 3];
  return (
    <div>
      <h2>Map</h2>
      {array.map((cellID) => (
        <Cell id={cellID} />
      ))}
    </div>
  );
}
