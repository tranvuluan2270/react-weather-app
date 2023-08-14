import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { GEO_API_URL, WEATHER_API_KEY } from "../services/weatherService";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    return await fetch(
      `${GEO_API_URL}?q=${inputValue}&limit=5&appid=${WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return {
          options: response.map((city) => {
            return {
              value: `${city.lat} ${city.lon}`,
              label: `${city.name}, ${city.country}`,
              name: `${city.name}`,
              state: `${city.state}`,
              country: `${city.country}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    console.log(searchData);
  };

  return (
    <>
      <AsyncPaginate
        className="text-lg font-alt focus:outline-none placeholder:lowercase"
        placeholder="search for a city..."
        onChange={handleOnChange}
        loadOptions={loadOptions}
        value={search}
        debounceTimeout={1000}
        openMenuOnClick={false}
      />
    </>
  );
};

export default Search;
