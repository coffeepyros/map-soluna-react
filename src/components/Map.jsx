import React from "react";
import { mapData } from "../mapData";
import Cell from "./Cell";

export default function Map() {
  return (
    <div>
      <h2>Map</h2>
      {mapData.map((col, index) => (
        <Cell key={index} id={col.col_ID} />
      ))}
    </div>
  );
}
