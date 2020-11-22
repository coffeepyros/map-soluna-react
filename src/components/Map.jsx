import React from "react";
import Cell from "./Cell";
import { useSelector } from "react-redux";

export default function Map(props) {
  const mapData = useSelector((state) => state);

  // NOTE OVERLAY HOVER FUNCTION
  document.addEventListener("mousemove", (e) => {
    const notesOverlay = document.getElementById("notesOverlay");
    let overlayOffsetX = 16;
    let overlayOffsetY = 16;
    if (
      e.target.classList.contains("hex") ||
      e.target.classList.contains("coords") ||
      e.target.tagName === "EM"
    ) {
      notesOverlay.style.display = "block";
      notesOverlay.style.top = e.clientY + overlayOffsetY + "px";
      notesOverlay.style.left = e.clientX + overlayOffsetX + "px";
    } else {
      notesOverlay.style.display = "none";
    }
    let indexCol, indexCell;
    if (e.target.classList.contains("hex")) {
      indexCol = e.target.getAttribute("data-col");
      indexCell = e.target.getAttribute("data-cell");
    } else if (
      e.target.classList.contains("coords") ||
      e.target.tagName === "EM"
    ) {
      indexCol = e.target.parentElement.getAttribute("data-col");
      indexCell = e.target.parentElement.getAttribute("data-cell");
    }
    if (indexCol && indexCell) {
      if (mapData[indexCol].data[indexCell].notes) {
        let title = document.createElement("h3");
        title.innerHTML = mapData[indexCol].data[indexCell].label
          .replace("<br/>", "")
          .replace("<br>", "");
        notesOverlay.innerText = mapData[indexCol].data[indexCell].notes;
        notesOverlay.prepend(title);
      } else notesOverlay.style.display = "none";
    }
  });
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
