import { useState } from "react";
import "./App.css";
export const Weather = () => {
  const apiKey = "2f7edf7443730c1e453a451e36e2ee93";
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      if (!res.ok) throw Error("Could not fetch resource");
      const data = await res.json();
      setData(data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(false);
      setError(error.message);
    }
  };
  return (
    <div>
      <div>
        {loading && <h1> Loading... </h1>}
        {error && <h1>{error} </h1>}
      </div>
      <input
        type="text"
        onChange={(e) => {
          setCityName(e.target.value);
        }}
      />
      <button onClick={fetchData}>Search</button>
      {data &&
        data.weather.map((weather) => (
          <div key={weather.id}>
            <h1>Weather:{weather.main}</h1>{" "}
            <h2>Description: {weather.description}</h2>
          </div>
        ))}
      <p>Lon:{data?.coord.lon} </p>
      <p>Lat: {data?.coord.lat} </p>
    </div>
  );
};
