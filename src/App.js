import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState(0); // To fix bug with undefined

  // !!!!!!!!!!!!!!!! WARNING IF YOU WANT TO USE GEOLOCATION !!!!!!!!!!!!!!!!! \\
  //! You won't be able to hide your API key on your server because the JS navigator object is used for browser detection. So it must necessarily access your API key in order to get your local device geographical position

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
  // eslint-disable-next-line
  // }, []);

  //* API call on page loading
  useEffect(() => {
    getWeatherData("Paris");
    // eslint-disable-next-line
  }, []);

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
      <h1>Weather In The City</h1>

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
