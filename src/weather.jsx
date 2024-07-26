import clearIcon from "./Assets/clear.png";
import cloudIcon from "./Assets/cloud.png";
import drizzleIcon from "./Assets/drizzle.png";
import thunderstormIcon from "./Assets/lightning.png";
import humidityIcon from "./Assets/humidity.png";
import rainIcon from "./Assets/rain.png";
import snowIcon from "./Assets/snow.png";
import windIcon from "./Assets/wind.png";
import hazeIcon from "./Assets/mist.png";

import { useState, useEffect } from "react";
import search from "./Assets/search.svg";
import "./weather.css";
export const Weather = () => {
  const apiKey = "2f7edf7443730c1e453a451e36e2ee93";
  const [cityName, setCityName] = useState("Sydney");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const icons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11n": thunderstormIcon,
    "11d": thunderstormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50n":hazeIcon,
    "50d":hazeIcon
  };
  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      if (!res.ok) throw Error("Could not fetch resource");
      const data = await res.json();
      const icon = icons[data.weather[0].icon];
      setData({ ...data, icon: icon });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="weather">
      {/* Weather Search Section */}
      <div className="weather-search">
        <input
          type="text"
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          placeholder="Search City..."
        />
        <button onClick={fetchData}>
          <img src={search} alt="" className="" />
          
        </button>
      </div>
      {/* Loading and Error message */}
      <div className="error-message">
        {loading && <h2> Loading... </h2>}
        {error && <h2>{error} </h2>}
      </div>
      {data && (
        <div className="weather-info">
          <img src={data?.icon} alt="icons" height={"150px"} />
          <h2>{(data.main.temp - 273.15).toFixed(0)}⁰C </h2>
          <h3>{data.name} </h3>

          <div className="details">
            <div className="detail-card">
              <img src={humidityIcon} alt="" />
              <span className="detail-item">
                <span>{data.main.humidity} % </span>
                <p>Humidity</p>
              </span>
            </div>

            <div className="detail-card">
              <img src={windIcon} alt="" />
              <span className="detail-item">
                <span className="p-one">
                  {Math.floor(data.wind.speed)} km/h
                </span>
                <p>Wind Speed</p>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
