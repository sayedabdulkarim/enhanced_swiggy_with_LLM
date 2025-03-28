import React from "react";
import { CheckedInput, UnCheckedInput } from "../../../../utils/svgs";
import { useSelector } from "react-redux";

const Cuisines = ({
  homePageFilterOptionsObj,
  isActiveOption,
  handleFilterChange,
  filters,
}) => {
  //misc
  const { homePageData } = useSelector((state) => state.homeReducer);
  const { cuisines } = filters;
  return (
    <div className="sc-aXZVg jxDVMd">
      <div className="sc-eulNck gNHAci">
        <div
          className="sc-aXZVg hMjUKj"
          onClick={() => console.log(filters, " homePageFilterOptionsObj")}
        >
          Filter By Cuisines
        </div>
      </div>
      <div className="sc-bXCLTC hcmGqD">
        {/* {homePageFilterOptionsObj[isActiveOption]?.map((item) => { */}
        {homePageData?.data?.cuisinesList?.map((item) => {
          const { _id, label } = item;
          return (
            <div
              label="Relevance (Default)"
              orientation="ltr"
              className="sc-hmdomO biZBXM"
              key={_id}
              style={{
                padding: "10px 0",
              }}
              onClick={() => handleFilterChange("cuisines", label)}
            >
              <span className="custom-checkbox">
                <div>
                  {cuisines?.includes(label) ? (
                    <CheckedInput />
                  ) : (
                    <UnCheckedInput />
                  )}
                </div>
              </span>
              <label htmlFor="Sort-0" className="sc-aXZVg MCNps">
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cuisines;
