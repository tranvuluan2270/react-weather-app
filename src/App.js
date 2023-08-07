import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./services/weatherService";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./assets/animation.json";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  var dailyData = {};

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

  forecast?.list.map((item) => {
    const dateTime = new Date(item.dt * 1000);
    const day = dateTime.getDate();
    const time = dateTime.getHours();
    // check if dailyData map has it
    if (!dailyData[day]) dailyData[day] = [];
    dailyData[day].push({ ...item, day, time });

    return dailyData;
  });

  console.log(currentWeather);
  console.log(forecast);
  console.log(dailyData);

  const formatBackground = () => {
    const getStatus = currentWeather?.weather[0].icon;
    if (!currentWeather) return "bg-gradient-to-tr from-cyan-500 to-blue-500";
    if (getStatus.charAt(getStatus.length - 1) === "d")
      return "bg-[url('./assets/day.webp')] min-h-screen bg-cover bg-fixed bg-center bg-no-repeat";
    return "bg-[url('./assets/night.webp')] min-h-screen bg-cover bg-fixed bg-center bg-no-repeat";
  };

  return (
    <div className={` min-h-screen py-6 ${formatBackground()}`}>
      {!currentWeather && (
        <div>
          <Player
            src={animationData}
            className="w-[400px] h-[400px] relative float-left left-10 top-10 "
            autoplay
            loop
          />
          <div className="m-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex flex-col gap-6 items-center justify-center h-1/3 backdrop-blur-[16px] drop-shadow-xl bg-white/30 text-zinc-700">
            <h1 className="text-4xl font-thin ">
              Weather <span className="font-black">Forecast</span>
            </h1>
            <p className="text-sm">
              Enter below a place you want to know the weather of and select an
              option from the dropdown
            </p>
            <div className="w-1/5">
              <Search onSearchChange={handleOnSearchChange} />
            </div>
          </div>
        </div>
      )}

      {currentWeather && (
        <div className=" mx-auto max-w-screen-lg px-32 py-6 my-6 backdrop-blur-[16px] backdrop-saturate-[180%] saturate-[180%] bg-gray-500/70  drop-shadow-xl rounded-xl  border border-gray-300/70">
          <CurrentWeather data={currentWeather} />
        </div>
      )}
      {forecast && (
        <div className="mx-auto max-w-screen-md px-16 py-3  backdrop-blur-[16px] backdrop-saturate-[180%] saturate-[180%] bg-gray-500/70  drop-shadow-xl rounded-xl  border border-gray-300/70">
          <Forecast data={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;
