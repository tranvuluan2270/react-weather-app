import {
  UilArrowDown,
  UilThermometer,
  UilTemperature,
  UilTemperatureQuarter,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
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

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <p className="text-white text-xl font-extralight">{`${dateTime.format(
          "dddd, DD MMMM YYYY"
        )} | Local time: ${dateTime.format("HH:mm ")}`}</p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="text-white text-3xl font-medium ">{data.city}</p>
      </div>
      <div className="flex items-center justify-center mt-2 text-xl text-cyan-300">
        <p>{data.weather[0].main}</p>
      </div>
      <div className="flex items-center justify-center mt-2 text-md text-cyan-200 font-light">
        <p>{data.weather[0].description}</p>
      </div>

      <div className="flex flex-row items-center justify-between  text-white my-6">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt=""
          className="w-20"
        />

        <p className="text-6xl">{data.main.temp.toFixed()}°</p>

        <div className="flex flex-col space-y-2 ">
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

      <div className="flex flex-row items-center justify-evenly  text-white text-sm">
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
