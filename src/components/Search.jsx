import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../services/weatherService";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <>
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4 ">
          <AsyncPaginate
            className="text-xl font-light p-2 w-full focus:outline-none capitalize placeholder:lowercase rounded-md"
            placeholder="Search for city"
            debounceTimeout={1000}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
          />
          <UilSearch
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
          />
          <UilLocationPoint
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
          />
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center">
          <button name="metric" className="text-xl text-white font-light">
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button name="imperial" className="text-xl text-white font-light">
            °F
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
