import { useState, useEffect } from "react";
import "./App.css";
const fetch = require("node-fetch");

function App() {
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState(0); // To fix bug with undefined

  // !!!!!!!!! WARNING IF YOU WANT TO USE GEOLOCATION !!!!!!!!! \\ You won't be able to hide your API key on your server because the JS navigator object is used for browser detection. So it must necessarily access your API key in order to get your local device geographical position

  // !!! So, if you want to use geolocation feature on this app, uncomment the code below by replacing the template literals (${apiKey}) by your own key, and comment the other useEffect code

  // !!!!!!!!! DO NOT PUSH YOUR EXPOSED KEY ON GITHUB !!!!!!!!! \\

  // Check if geolocation is available in user's browser on page loading
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(
  //       (position) => {
  //         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  //         callAPI(url);
  //       },
  //       error,
  //       options
  //     );
  //   } else {
  //     alert("Votre navigateur ne prend pas en charge la géolocalisation.");
  //     getWeatherData("Paris");
  //   }

  //   function error() {
  //     alert(
  //       "Problème ou refus de géolocalisation.\n\nEn cas de refus, si vous changez d'avis, videz le cache de votre navigateur, avant de vous reconnecter à l'application."
  //     );
  //     getWeatherData("Paris");
  //   }

  //   var options = {
  //     enableHighAccuracy: true,
  //   };
  // }, []);

  //* API call on page loading
  useEffect(() => {
    getWeatherData("Paris");
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
