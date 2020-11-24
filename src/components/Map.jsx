import React from "react";
import Cell from "./Cell";
import { useSelector } from "react-redux";

export default function Map() {
  const mapData = useSelector((state) => state);

  return (
    <figure role="group" id="map">
      {/* Double map function. First is for the columns of the map (x-direction)
      second is for the individual cells inside each column (y-direction) */}
      {mapData.map((column, colIndex) => (
        <section className="column" key={colIndex}>
          {column.data.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              // Since order is important and the map data therefor saved as arrays
              // you need to pass the array indicies as well
              // (array index for column/cell are different from the map coordinates)
              arrayIndex={{ col: colIndex, cell: cellIndex }}
              cellData={cell}
            />
          ))}
        </section>
      ))}
    </figure>
  );
}
