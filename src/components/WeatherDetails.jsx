import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

const WeatherDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>Cloudy</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src="http://openweathermap.org/img/wn/01d@2x.png"
          alt=""
          className="w-20 "
        />
        <p className="text-5xl">19°</p>
        <div className="flex flex-col space-y-2 ">
          <div className="flex font-light text-sm  ">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">18°</span>
          </div>
          <div className="flex font-light text-sm  ">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">43%</span>
          </div>
          <div className="flex font-light text-sm  ">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">3 km/h</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise: <span className="font-medium ml-1">04:50 AM</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set: <span className="font-medium ml-1"> 09:17 PM</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light">
          High: <span className="font-medium ml-1">21°</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light">
          Low: <span className="font-medium ml-1">17°</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherDetails;
