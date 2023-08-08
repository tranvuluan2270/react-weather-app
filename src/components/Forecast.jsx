import moment from "moment/moment";

const Forecast = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-start">
        <p className="text-white font-medium uppercase">Next 5 Days forecast</p>
      </div>
      <hr className="mt-1" />

      <div className="flex flex-row items-center justify-between text-white py-3  gap-5 overflow-x-scroll scroll-smooth scrollbar">
        {data.list.map((item, index) => (
          <div
            className=" flex flex-col flex-shrink-0 items-center justify-center gap-1 p-3  w-36 backdrop-blur-none bg-white/20 border border-white/30 rounded shadow-lg"
            key={index}
          >
            <p className="font-light text-sm">
              {moment
                .unix(item.dt)
                .utc()
                .add(data.city.timezone, "s")
                .format("dddd DD")}
            </p>
            <p className="font-medium text-md">
              {moment
                .unix(item.dt)
                .utc()
                .add(data.city.timezone, "s")
                .format("HH:mm")}
            </p>

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
