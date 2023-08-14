import {
  UilArrowDown,
  UilThermometer,
  UilTemperature,
  UilTemperatureQuarter,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilMapMarker,
} from "@iconscout/react-unicons";
import moment from "moment/moment";

const CurrentWeather = ({ data }) => {
  let dateTime = moment.unix(data.dt).utc().add(data.timezone, "s");
  let sunriseTime = moment.unix(data.sys.sunrise).utc().add(data.timezone, "s");
  let sunsetTime = moment.unix(data.sys.sunset).utc().add(data.timezone, "s");

  const getDirection = (deg) => {
    var directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    var index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 22.5) % 16;
    return directions[index];
  };
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={refreshPage}
        className="absolute top-5 left-5 py-1 px-2 bg-white/30 text-white/50 hover:bg-white/50 hover:text-white rounded shadow transition-all"
      >
        <UilMapMarker />
      </button>
      <div className="flex flex-col items-center justify-center ">
        <p className="text-white text-xl font-extralight">{`${dateTime.format(
          "dddd, DD MMMM YYYY"
        )} | Local time: ${dateTime.format("HH:mm ")}`}</p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="text-white text-3xl font-alt relative">
          {data.city.name}
          <span className="text-white/70 text-lg font-altXLight absolute top-0 ml-2">
            {data.city.country}
          </span>
        </p>
      </div>
      {data.city.state !== "undefined" && (
        <div className="flex items-center justify-center my-2">
          <p className="text-white/70 text-xl font-alt">{data.city.state}</p>
        </div>
      )}
      <div className="flex items-center justify-center text-lg mt-2 text-cyan-300">
        <p>{data.weather[0].main}</p>
      </div>
      <div className="flex items-center justify-center text-md text-cyan-200 font-extralight">
        <p>{data.weather[0].description}</p>
      </div>

      <div className="flex items-center justify-between relative text-white my-6">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt=""
          className="w-20"
          draggable="false"
        />

        <p className="text-5xl absolute left-[50%] translate-x-[-50%]">
          {data.main.temp.toFixed()}°
        </p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm  ">
            <UilThermometer size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">
              {data.main.feels_like.toFixed()}°
            </span>
          </div>
          <div className="flex font-light text-sm  ">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{data.main.humidity}%</span>
          </div>
          <div className="flex font-light text-sm  ">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">
              {(data.wind.speed * 3.6).toFixed()} km/h
              <UilArrowDown
                style={{
                  display: "inline-block",
                  rotate: `${data.wind.deg}deg`,
                }}
              />
              {getDirection(data.wind.deg)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between  text-white text-sm">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {sunriseTime.format("HH:mm")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">{sunsetTime.format("HH:mm")}</span>
        </p>
        <p className="font-light">|</p>

        <UilTemperature />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">
            {data.main.temp_max.toFixed()}°
          </span>
        </p>
        <p className="font-light">|</p>

        <UilTemperatureQuarter />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">
            {data.main.temp_min.toFixed()}°
          </span>
        </p>
      </div>
    </>
  );
};

export default CurrentWeather;
