import { useState, useEffect } from "react";
import "./App.css";
const fetch = require("node-fetch");

function App() {
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState(0); // To fix bug with undefined

  //* API call on page loading
  useEffect(() => {
    getWeatherData("paris");
  }, []);

  function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    callAPI(url);
  }

  async function callAPI(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.cod == "404") {
          alert("Entrée invalide. Veuillez indiquer un autre nom de ville.");
          getWeatherData("Paris");
        } else {
          setCity(json.name);
          setTemperature(json.main.temp);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
          onClick={() => getWeatherData(prompt("Entrez le nom d'une ville."))}
        >
          CHANGER DE VILLE
        </button>
      </div>
    </div>
  );
}

export default App;
