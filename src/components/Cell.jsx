import React from "react";

export default function Cell(props) {
  let classList = "hex";
  if (props.cellData.terrain) classList += " " + props.cellData.terrain;
  return (
    <figure
      className={classList}
      data-col={props.arrayIndex.col}
      data-cell={props.arrayIndex.cell}
      onClick={(e) => {
        // Hidden input elements with array indices for column (x) and cell (y)
        document.getElementById("colIndex").value = props.arrayIndex.col;
        document.getElementById("cellIndex").value = props.arrayIndex.cell;
        // since there can be html elements inside a hex field, you can click on
        // this html element (like <em>), instead of the hex itself.
        // so you have to check the target and redirect to the parent element,
        // to land on the hex html element itself...
        // if (e.target.classList.contains("hex"))
        //   e.target.classList.toggle("edit");
        // else e.target.parentElement.classList.toggle("edit");
        document.getElementById("cellID").value =
          props.cellData.x + "," + props.cellData.y;
        if (props.cellData.label)
          document.getElementById("label").value = props.cellData.label;
        else document.getElementById("label").value = "";
        if (props.cellData.terrain)
          document.getElementById("terrain").value = props.cellData.terrain;
        else document.getElementById("terrain").value = "";
        if (props.cellData.notes)
          document.getElementById("notes").value = props.cellData.notes;
        else document.getElementById("notes").value = "";
      }}
    >
      <span className="coords">
        {props.cellData.x},{props.cellData.y}
      </span>
      {/* TEMPORARY SOLUTION */}
      {/* in vanilla JS I could insert HTML directly, in React it's handled as
      text... */}
      {props.cellData.label.includes("<em>") ? (
        <em>{props.cellData.label.replace("<em>", "").replace("</em>", "")}</em>
      ) : (
        props.cellData.label
      )}
    </figure>
  );
}
