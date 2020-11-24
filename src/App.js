import React from "react";
import Map from "./components/Map";
import NotesOverlay from "./components/NotesOverlay";
import { useDispatch } from "react-redux";
import {
  editCell,
  switchUser,
  addRowUp,
  addRowDown,
  addColumnLeft,
  addColumnRight,
} from "./redux/actions";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      {/* Overlay for Export / Import */}
      <div id="overlay" className="hidden">
        <a href="#">[ Close ]</a>
        <textarea></textarea>
      </div>
      {/* Overlay for Notes, displayed on hover next to hex cell */}
      <NotesOverlay />
      {/* User selection in top right corner */}
      <section id="admin">
        <select
          id="user"
          name="user"
          onChange={(e) => {
            let user = e.target.value;
            console.log(user);
            dispatch(switchUser(user));
          }}
        >
          <option value="player" defaultValue="selected">
            Player
          </option>
          <option value="gm">GM</option>
        </select>
      </section>
      {/* Main Headline, is placed absolutely, above (z-index) map */}
      <header>
        <h1>Map of Soluna</h1>
      </header>
      <main>
        <button
          className="addCells" // visuals (CSS)
          id="addRowUp" // needed for CSS Grid
          onClick={() => {
            dispatch(addRowUp()); // Redux Action
          }}
        >
          +1
        </button>
        <button
          className="addCells"
          id="addColLeft"
          onClick={() => {
            dispatch(addColumnLeft());
          }}
        >
          +2
        </button>
        {/* The Map itself, is build out of <Cell> components. */}
        <Map />
        <button
          className="addCells"
          id="addColRight"
          onClick={() => {
            dispatch(addColumnRight());
          }}
        >
          +2
        </button>
        <button
          className="addCells"
          id="addRowDown"
          onClick={() => {
            dispatch(addRowDown());
          }}
        >
          +1
        </button>
      </main>
      <aside>
        <form
          id="mapInterface"
          onSubmit={(e) => {
            const hideCoordsButton = document.querySelector(
              "button#hideCoords"
            );
            let coords = document.querySelectorAll(".coords");
            for (let span of coords) {
              span.classList.toggle("hidden");
              if (hideCoordsButton.innerText === "Hide Coordinates")
                hideCoordsButton.innerText = "Show Coordinates";
              else if (hideCoordsButton.innerText === "Show Coordinates")
                hideCoordsButton.innerText = "Hide Coordinates";
            }
            e.preventDefault();
          }}
        >
          <h2>Map Options</h2>
          <button id="hideCoords">Hide Coordinates</button>
        </form>

        <form
          id="formMapData"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>Load / Save</h2>
          {/* <button id="btnImport">Import Map</button> */}
          <button id="btnExport" type="submit">
            Export Map
          </button>
        </form>

        <form
          id="formEditCell"
          onSubmit={(e) => {
            e.preventDefault();
            let formData = {
              colIndex: document.getElementById("colIndex").value,
              cellIndex: document.getElementById("cellIndex").value,
              label: document.getElementById("label").value,
              terrain: document.getElementById("terrain").value,
              notes: document.getElementById("notes").value,
            };
            dispatch(editCell(formData));
          }}
        >
          <h2>Edit Map Cell</h2>
          <input type="hidden" id="colIndex" name="colIndex" value="0" />
          <input type="hidden" id="cellIndex" name="cellIndex" value="0" />

          <label htmlFor="cellID">Cell ID:</label>
          <input type="text" id="cellID" name="cellID" readOnly="readonly" />

          <label htmlFor="label">Label:</label>
          <input type="text" id="label" name="label" />

          <label htmlFor="terrain">Terrain:</label>
          <select id="terrain" name="terrain">
            <option value="capitol">Capitol</option>
            <option value="city">City</option>
            <option value="forest">Forest</option>
            <option value="grass">Grass</option>
            <option value="hills">Hills</option>
            <option value="mountains">Mountains</option>
            <option value="steppe">Steppe</option>
            <option value="swamp">Swamp</option>
            <option value="water">Water</option>
            <option value="">---</option>
            <option value="undiscovered">Undiscovered</option>
          </select>

          <label htmlFor="notes">Notes:</label>
          <textarea id="notes" name="notes"></textarea>

          <button type="submit">Save</button>
          <p>
            <strong>Hinweis:</strong> Save speichert momentan nur temporär,
            solange der Browser-Tab auf ist. Übergangslösung für langfristige
            Speicherung: Export in Textdatei und fürs Weiterarbeiten wieder
            Import aus Textdatei.
          </p>
        </form>
      </aside>
    </React.Fragment>
  );
}
