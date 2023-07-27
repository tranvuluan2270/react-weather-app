const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, 1)
  );

  return (
    <>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">3-hour forecast</p>
      </div>
      <hr className="my-1" />

      <div className="flex flex-row items-center justify-between text-white my-4 ">
        {data.list.splice(0, 5).map((item, index) => (
          <div
            className="flex flex-col items-center justify-center gap-1"
            key={index}
          >
            <p className="font-light text-md">{forecastDays[index]}</p>

            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt=""
              className="w-12"
            />
            <p className="font-extralight text-xs">{item.weather[0].main}</p>
            <p className="font-medium">{item.main.temp.toFixed()}°</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Forecast;
