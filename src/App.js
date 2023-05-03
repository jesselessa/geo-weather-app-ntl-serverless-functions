import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState(0); // To fix bug with undefined

  return (
    <div className="App">
      <h1>Météo</h1>

      <div className="card">
        <p id="ville">{city}</p>

        <div id="temperature">
          <span id="temperature-label">
            {Math.round(temperature * 10) / 10} °C
            {/* Round to 1 decimal place */}
          </span>
        </div>

        <button
          id="changer"
          onClick={() => prompt("Entrez le nom d'une ville.")}
        >
          CHANGER DE VILLE
        </button>
      </div>
    </div>
  );
}

export default App;
