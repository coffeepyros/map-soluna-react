import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NotesOverlay.css";

export default function NotesOverlay() {
  const mapData = useSelector((state) => state); // get map data from redux store
  const [label, updateLabel] = useState(); // use React hook to store note details
  const [notes, updateNotes] = useState(); // use React hook to store note details
  const [activeCell, updateCell] = useState(); // use React hook to keep track of the active cell
  const notesOverlay = document.getElementById("notesOverlay");

  document.addEventListener("mousemove", (e) => {
    if (e.target.classList.contains("hex")) {
      updateCell(e.target);
    } else if (
      e.target.classList.contains("em") ||
      e.target.classList.contains("span")
    ) {
      updateCell(e.target.parentElement);
    }
    if (notesOverlay) {
      notesOverlay.style.top = e.clientY - 36 + "px";
      notesOverlay.style.left = e.clientX + 36 + "px";
    }
  });

  useEffect(() => {
    if (activeCell) {
      let colIndex = activeCell.getAttribute("data-col");
      let cellIndex = activeCell.getAttribute("data-cell");
      let headline = mapData[colIndex].data[cellIndex].label;
      headline = headline
        .replace("<em>", "")
        .replace("</em>", "")
        .replace("<br>", "")
        .replace("<br/>", "");
      let content = mapData[colIndex].data[cellIndex].notes;
      updateNotes(content);
      updateLabel(headline);
      if (content === "") notesOverlay.style.display = "none";
      else notesOverlay.style.display = "block";
    }
  }, [activeCell, mapData]);

  return (
    <div id="notesOverlay">
      <h3>{label}</h3>
      <p>{notes}</p>
    </div>
  );
}
