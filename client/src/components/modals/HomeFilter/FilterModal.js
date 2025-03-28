import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { homePageFilterOptionsObj } from "../../../utils/constant";
//slice
import {
  applyStoreFilters,
  setFilterModalOpen,
  clearFilters,
} from "../../../slices/homeSlice";
//filter option vomponents
import SortComponent from "./OptionsComponents/Sort";
import DeliveryTimeComponent from "./OptionsComponents/DeliveryTime";
import CuisinesComponent from "./OptionsComponents/Cuisines";
import ExploreComponent from "./OptionsComponents/Explore";
import RatingsComponent from "./OptionsComponents/Ratings";
import VegNonVegComponent from "./OptionsComponents/VegNonVeg";
import CostForTwoComponent from "./OptionsComponents/CostForTwo";
import OffersComponent from "./OptionsComponents/Offers";
import { hasActiveFilters } from "../../../utils/commonHelper";

const FilterModal = ({
  isActiveOption,
  handleSetIsActiveOption,
  handleFilterChange,
  filters,
  handleClearFilter,
}) => {
  //misc
  const dispatch = useDispatch();
  const { isFilterModalOpen, filterOption } = useSelector(
    (state) => state.homeReducer
  );

  //state

  //func
  const handleOk = () => {
    console.log("OK calleddd");
    dispatch(applyStoreFilters());
    dispatch(setFilterModalOpen(false));
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancel calleddd");
    // setIsModalOpen(false);
    dispatch(setFilterModalOpen(false));
  };

  const handleClear = () => {
    handleClearFilter();
  };

  const modalFooter = (
    <div className="btn_container">
      <div className="left_space"></div>
      <Button onClick={() => handleClear()} className="clear_btn">
        <span>Clear Filters</span>
      </Button>
      <Button type="primary" onClick={handleOk} className="apply_btn">
        Apply
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        title="Filter"
        open={isFilterModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={hasActiveFilters(filterOption) ? modalFooter : ""} // Set the custom footer
        className="homeFilterModal"
        width={800}
        centered
      >
        <div className="sc-iEXKAA gQcZGA dwebBottomSheet">
          <div className="sc-lnPyaJ kriBiB">
            <div className="sc-ePDLzJ jRJFVS">
              <ul className="sc-cVzyXs ibgRwr">
                {Object.keys(homePageFilterOptionsObj).map((o) => {
                  return (
                    <li
                      className={`sc-YysOf eGsoBa ${
                        isActiveOption === o ? "isActiveOption" : ""
                      }`}
                      key={o}
                      onClick={() => handleSetIsActiveOption(o)}
                    >
                      <div className="item-wrapper">
                        <div className="sc-aXZVg cbGKQI">{o}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {/* right */}
              <div className="content">
                {isActiveOption === "Sort" ? (
                  <SortComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Delivery Time" ? (
                  <DeliveryTimeComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Cuisines" ? (
                  <CuisinesComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Explore" ? (
                  <ExploreComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Ratings" ? (
                  <RatingsComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Veg/ Non Veg" ? (
                  <VegNonVegComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Cost For Two" ? (
                  <CostForTwoComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : isActiveOption === "Offers" ? (
                  <OffersComponent
                    isActiveOption={isActiveOption}
                    homePageFilterOptionsObj={homePageFilterOptionsObj}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                ) : (
                  ""
                )}
              </div>
              {/* right */}
            </div>
          </div>
          <button className="sc-EgOXT eYVseU" aria-label="click here to close">
            {/* SVG for close button */}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FilterModal;
