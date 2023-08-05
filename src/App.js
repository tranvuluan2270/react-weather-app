import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./services/weatherService";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast/?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="min-h-screen py-6 bg-gradient-to-tr from-cyan-500 to-blue-500">
      <div className="mx-auto w-1/4 px-8 py-4 backdrop-blur-[20px] bg-gray-800/20  shadow-lg rounded-lg border border-gray-300">
        <Search onSearchChange={handleOnSearchChange} />
      </div>

      {currentWeather && (
        <div className=" mx-auto max-w-screen-lg px-32 py-6 my-6 backdrop-blur-[20px] bg-gray-800/20  shadow-lg rounded-lg border border-gray-300">
          <CurrentWeather data={currentWeather} />
        </div>
      )}
      {forecast && (
        <div className="mx-auto max-w-screen-md px-16 py-3  backdrop-blur-[20px] bg-gray-800/20  shadow-lg rounded-lg border border-gray-300">
          <Forecast data={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;
