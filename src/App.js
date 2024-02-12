import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState(0); // To fix bug with undefined

  //!--------- WARNING IF YOU WANT TO USE GEOLOCATION ---------!\\
  // !!!!!!! DO NOT PUSH YOUR EXPOSED API KEY ON GITHUB !!!!!!! \\

  // Check if geolocation is available in user's browser on page loading
  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`; // Replace by your actual API key

          callAPI(url);
        },
        error,
        options
      );
    } else {
      alert("Votre navigateur ne prend pas en charge la géolocalisation.");
      getWeatherData("Paris");
    }

    function error() {
      alert(
        "Problème ou refus de géolocalisation.\n\nEn cas de refus, si vous changez d'avis, videz le cache de votre navigateur, avant de vous reconnecter à l'application."
      );
      getWeatherData("Paris");
    }

    // eslint-disable-next-line
  }, []);

  //TODO - Uncomment below if you don't want to use geolocation and comment useEffect function above
  // // API call on page loading
  // useEffect(() => {
  //   getWeatherData("Paris");
  //   // eslint-disable-next-line
  // }, []);

  function getWeatherData(city) {
    const url = `api/getWeatherData?city=${city}`; // api = shortcut for .netlify/functions set in netlify.toml

    callAPI(url);
  }

  async function callAPI(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404 || data.status === 400) {
          alert("Invalid entry. Enter another city name.");
          getWeatherData("Paris");
        } else {
          setCity(data.name);
          setTemperature(data.main.temp);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }

  return (
    <div className="App">
      <h1>Weather App</h1>

      <div className="card">
        <p id="ville">{city}</p>

        <div id="temperature">
          <span id="temperature-label">{Math.round(temperature)} °C</span>
        </div>

        <button
          id="changer"
          onClick={() => getWeatherData(prompt("Enter a city name."))}
        >
          CHANGE CITY
        </button>
      </div>
    </div>
  );
}

export default App;
