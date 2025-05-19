import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

// AsyncPaginate is a React component that provides asynchronous, paginated dropdowns for selecting options, often used for large datasets.
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null); // Initialize state with useState

  const loadOptions = async (inputValue) => {
    if (!inputValue) {
      return { options: [] }; // Return empty options if input is empty
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return {
        options: result.data.map((city) => ({
          label: `${city.name}, ${city.countryCode}`,
          value: `${city.latitude} ${city.longitude} ${city.id}`, // Removed extra space at the start of the value
        })),
      };
    } catch (error) {
      console.error("Failed to fetch city data:", error);
      return { options: [] }; // Return empty options on error
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData); // Update the search state
    onSearchChange(searchData); // Trigger the parent callback
  };

  return (
    <AsyncPaginate
      placeholder="Search the city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;