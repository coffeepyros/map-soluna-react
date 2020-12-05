import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NotesOverlay.css";

export default function NotesOverlay(props) {
  const mapData = useSelector((state) => state); // get map data from redux store
  const [label, updateLabel] = useState(); // use React hook to store note details
  const [notes, updateNotes] = useState(); // use React hook to store note details
  const notesOverlay = document.getElementById("notesOverlay");

  useEffect(() => {
    if (props.activeCell) {
      // the Column and Cell indicies were stored as HTML data attributes
      // during map creating (in Cell.jsx)
      let colIndex = props.activeCell.getAttribute("data-col");
      let cellIndex = props.activeCell.getAttribute("data-cell");
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
  }, [props.activeCell, mapData]); // changes the overlay content when the active cell changes,
  // or when the map data changes

  return (
    <div id="notesOverlay" className="hidden">
      <h3>{label}</h3>
      <p>{notes}</p>
    </div>
  );
}
