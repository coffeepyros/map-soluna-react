import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NotesOverlay.css";

export default function NotesOverlay(props) {
  const mapData = useSelector((state) => state); // get map data from redux store

  const [activeCell, updateActiveCell] = useState(); // use React hook to keep track of the active cell
  const [label, updateLabel] = useState(); // use React hook to store note details
  const [notes, updateNotes] = useState(); // use React hook to store note details

  const notesOverlay = document.getElementById("notesOverlay");
  const overlayOffsetX = 36; // space between mouse curser and overlay (to the right)
  const overlayOffsetY = -36; // space between mouse curser and start of the overlay (on top)

  console.log(props.frame);

  // Attaches the overlay position the the mouse curser, so the overlay moves with the mouse
  // I wanted to constrict the event just to the map itself (<figure id="map">), but I can't
  // access it here from a child component...
  document.addEventListener("mousemove", (e) => {
    if (e.target.classList.contains("hex")) {
      updateActiveCell(e.target); // re-targeting React Hook
      // if the mouse is over another html element inside a hex cell the event target is this html element,
      // not the cell itself. So I have to target the parent html element, to hit the cell.
    } else if (
      e.target.classList.contains("em") ||
      e.target.classList.contains("span")
    ) {
      updateActiveCell(e.target.parentElement); // re-targeting React Hook
    }
    if (notesOverlay) {
      notesOverlay.style.top = e.clientY + overlayOffsetY + "px";
      notesOverlay.style.left = e.clientX + overlayOffsetX + "px";
    }
  });

  useEffect(() => {
    if (activeCell) {
      // the Column and Cell indicies were stored as HTML data attributes
      // during map creating (in Cell.jsx)
      let colIndex = activeCell.getAttribute("data-col");
      let cellIndex = activeCell.getAttribute("data-cell");
      let headline = mapData[colIndex].data[cellIndex].label;
      // Clean up map data leftovers from earlier Vanilla JavaScript Map Tool, like HTML tags...
      headline = headline
        .replace("<em>", "")
        .replace("</em>", "")
        .replace("<br>", "")
        .replace("<br/>", "");
      let content = mapData[colIndex].data[cellIndex].notes;
      updateNotes(content);
      updateLabel(headline);
      if (content !== "") notesOverlay.classList.remove("hidden");
      else notesOverlay.classList.add("hidden");
    }
  }, [activeCell, mapData]); // changes the overlay content when the active cell changes,
  // or when the map data changes

  return (
    <div id="notesOverlay" className="hidden">
      <h3>{label}</h3>
      <p>{notes}</p>
    </div>
  );
}
