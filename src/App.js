import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./services/weatherService";
import { Player } from "@lottiefiles/react-lottie-player";
import animation1 from "./assets/animation1.json";
import animation2 from "./assets/animation2.json";

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
            src={animation1}
            className=" w-[500px] h-[500px] relative float-left left-10 bottom-5"
            autoplay
            loop
          />
          <Player
            src={animation2}
            className="  w-[600px] relative float-right right-20"
            autoplay
            loop
          />
          <div className="m-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex flex-col gap-6 items-center justify-center h-1/3 backdrop-blur-sm drop-shadow-xl bg-white/20 border border-white/40 ">
            <h1 className="text-5xl text-sky-200 font-thin">
              Weather {""}
              <span className="text-sky-800 font-black">Forecast</span>
            </h1>
            <p className="text-lg font-extralight text-white">
              Enter a place below and select a city
            </p>
            <div className="w-1/5">
              <Search onSearchChange={handleOnSearchChange} />
            </div>
          </div>
        </div>
      )}

      {currentWeather && forecast && (
        <div>
          <div className="mx-auto max-w-screen-md px-16 py-6 backdrop-blur-[16px] backdrop-saturate-[200%] saturate-[200%] bg-gray-500/70  shadow-xl rounded-lg  border border-white/70">
            <CurrentWeather data={currentWeather} />
          </div>
          <div className="mx-auto max-w-screen-md px-16 py-3 my-3 backdrop-blur-[16px] backdrop-saturate-[200%] saturate-[200%] bg-gray-500/70  shadow-xl rounded-lg  border border-white/70">
            <Forecast data={forecast} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
