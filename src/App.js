import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCell,
  switchUser,
  addRowUp,
  addRowDown,
  addColumnLeft,
  addColumnRight,
} from "./redux/actions";
import Map from "./components/Map";
import "./App.css";

export default function App() {
  const mapData = useSelector((state) => state);
  // const [formData, setFormData] = useState(); // use React hook to store note details
  const dispatch = useDispatch();

  // function handleChange(e) {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // }

  return (
    <React.Fragment>
      {/* Overlay for Export / Import */}
      {/* <div id="overlay" className="hidden">
        <a href="#">[ Close ]</a>
        <textarea></textarea>
      </div> */}

      {/* User selection in top right corner */}
      <section id="admin">
        <select
          id="user"
          name="user"
          onChange={(e) => {
            let user = e.target.value;
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

      {/* MAP AND BUTTONS TO INCREASE THE MAP SIZE */}
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

      {/* USER INTERFACE (RIGHT SIDE OF LAYOUT) */}
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
          <button
            id="btnDownload"
            onClick={() => {
              var dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(
                  "export const playerMapData = " +
                    JSON.stringify(mapData) +
                    ";"
                );
              var downloadAnchorNode = document.createElement("a");
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "map-soluna.txt");
              document.body.appendChild(downloadAnchorNode); // required for firefox
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
          >
            Download Map
          </button>
          {/* <button id="btnExport" type="submit">
            Export Map
          </button> */}
        </form>

        <form
          id="formEditCell"
          onSubmit={(e) => {
            e.preventDefault();
            let sendData = {
              // React can't handle hidden input fields, so I have to add the values directly and not over the state
              colIndex: parseInt(document.getElementById("colIndex").value),
              cellIndex: parseInt(document.getElementById("cellIndex").value),

              // The rest is read dynamically with the handleChange function...
              // label: formData.label,
              // terrain: formData.terrain,
              // notes: formData.notes,

              // Nope, it's not. When you click on a cell with existing input and only change one thing,
              //  the existing data is not submitted, because it didn't *CHANGE* ... and the redux action
              // EDIT_CELL needs a full set of data.

              label: document.getElementById("label").value,
              terrain: document.getElementById("terrain").value,
              notes: document.getElementById("notes").value,
            };
            dispatch(editCell(sendData));
          }}
        >
          <h2>Edit Map Cell</h2>
          {/* Hidden input fields for storing Column and Cell index (coming from Cell.jsx click event) */}
          <input type="hidden" id="colIndex" name="colIndex" />
          <input type="hidden" id="cellIndex" name="cellIndex" />

          <label htmlFor="cellID">Cell ID:</label>
          <input type="text" id="cellID" name="cellID" readOnly="readonly" />

          <label htmlFor="label">Label:</label>
          <input
            type="text"
            id="label"
            name="label" /* onChange={handleChange} */
          />

          <label htmlFor="terrain">Terrain:</label>
          <select id="terrain" name="terrain" /* onChange={handleChange} */>
            <option value="capitol">Capitol</option>
            <option value="city">City</option>
            <option value="forest">Forest</option>
            <option value="grass">Grass</option>
            <option value="hills">Hills</option>
            <option value="mountains">Mountains</option>
            <option value="steppe">Steppe</option>
            <option value="swamp">Swamp</option>
            <option value="water">Water</option>
            <option value="" defaultValue="selected">
              ---
            </option>
            <option value="undiscovered">Undiscovered</option>
          </select>

          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes" /* onChange={handleChange} */
          ></textarea>

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
