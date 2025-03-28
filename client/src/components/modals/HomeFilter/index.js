import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FilterModal from "./FilterModal";
import { clearFilters, setStoreFilters } from "../../../slices/homeSlice";
import { initialFilterOption } from "../../../utils/commonHelper";
const HomeFilter = () => {
  //misc
  const dispatch = useDispatch();
  //state
  const [isActiveOption, setIsActiveOption] = useState("Sort");

  const [filters, setFilters] = useState({
    sort: "",
    deliveryTime: [],
    cuisines: [],
    explore: [],
    rating: [],
    vegNonVeg: null,
    costForTwo: [],
    offers: null,
  });

  //func
  const handleSetIsActiveOption = (val) => {
    setIsActiveOption(val);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      // For categories that support multiple selections, like cuisines:
      if (Array.isArray(prevFilters[category])) {
        if (prevFilters[category].includes(value)) {
          // Deselect
          return {
            ...prevFilters,
            [category]: prevFilters[category].filter((item) => item !== value),
          };
        } else {
          // Select
          return {
            ...prevFilters,
            [category]: [...prevFilters[category], value],
          };
        }
      } else {
        // For categories that only allow a single selection:
        return {
          ...prevFilters,
          [category]: value,
        };
      }
    });
  };

  const handleClearFilter = () => {
    setFilters(initialFilterOption);
    dispatch(clearFilters());
  };

  //async
  useEffect(() => {
    console.log("calledddd");
    dispatch(setStoreFilters(filters));
  }, [filters, dispatch]);

  return (
    <div>
      <FilterModal
        //selected filter option
        isActiveOption={isActiveOption}
        handleSetIsActiveOption={handleSetIsActiveOption}
        //
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleClearFilter={handleClearFilter}
      />
    </div>
  );
};

export default HomeFilter;
