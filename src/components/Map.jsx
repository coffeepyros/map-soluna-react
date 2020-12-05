import React, { useState } from "react";
import Cell from "./Cell";
import NotesOverlay from "./NotesOverlay";
import { useSelector } from "react-redux";

export default function Map() {
  const mapData = useSelector((state) => state);
  const [activeCell, updateActiveCell] = useState(); // use React hook to keep track of the active cell
  const notesOverlay = document.getElementById("notesOverlay");
  const overlayOffsetX = 36; // space between mouse curser and overlay (to the right)
  const overlayOffsetY = -36; // space between mouse curser and start of the overlay (on top)

  return (
    <React.Fragment>
      <figure
        role="group"
        id="map"
        onMouseMove={(e) => {
          if (e.target.classList.contains("hex")) {
            if (notesOverlay) notesOverlay.style.visibility = "visible";
            updateActiveCell(e.target); // re-targeting React Hook
            // if the mouse is over another html element inside a hex cell the event target is this html element,
            // not the cell itself. So I have to target the parent html element, to hit the cell.
          } else if (e.target.tagName === "EM" || e.target.tagName === "SPAN") {
            if (notesOverlay) notesOverlay.style.visibility = "visible";
            updateActiveCell(e.target.parentElement); // re-targeting React Hook
          } else {
            if (notesOverlay) notesOverlay.style.visibility = "hidden";
          }
          if (notesOverlay) {
            notesOverlay.style.top = e.clientY + overlayOffsetY + "px";
            notesOverlay.style.left = e.clientX + overlayOffsetX + "px";
          }
        }}
      >
        <NotesOverlay activeCell={activeCell} />

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
      {/* Overlay for Notes, displayed on hover next to hex cell */}
    </React.Fragment>
  );
}
