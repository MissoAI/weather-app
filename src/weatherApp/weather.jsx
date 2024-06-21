import { useState } from "react";
import "./weather.css";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState({});
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  async function getWeatherData() {
    const card = document.querySelector(".weather-card");
    const input = document.getElementById("city-input");
    const inputValue = input.value;
    const apiKey = "84d59e0888b162ad4ce8620dacd67182";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok || input === "") {
        window.alert("Please enter a city name");
        throw new Error(`Couldn't fetch data error ${response.status}`);
      } else {
        card.style.display = "flex";
      }
      setWeatherData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <section className="inputs">
        <input id="city-input" type="text" placeholder="Enter city name" />
        <button onClick={getWeatherData} className="weather-btn">
          Get Weather
        </button>
      </section>
      <section className="weather-card" style={{ display: "none" }}>
        <section className="weather-data">
          <p id="weather">
            {weatherData.weather ? weatherData.weather[0].main : ""}
          </p>
          <p id="temp">
            {weatherData.main
              ? Math.round(weatherData.main.temp - 273.15) + "°C"
              : ""}
          </p>
        </section>
        <section className="city-data">
          <p id="city">
            <img src="./assets/location.png" alt="" style={{margin : "0"}} />
            {weatherData.name ? weatherData.name : ""}
          </p>
          <p id="date">
            {dayNames[date.getDay()]}, {date.getDate()}{" "}
            {monthNames[date.getMonth()]}
          </p>
        </section>
        <span id="weather-icon">
          {weatherData.weather ? (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather-icon"
              style={{ width: "120px" }}
              id="icon"
            />
          ) : (
            ""
          )}
        </span>
      </section>
    </>
  );
}
export default WeatherApp;
