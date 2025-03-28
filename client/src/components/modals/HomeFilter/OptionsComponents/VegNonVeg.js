import React from "react";
import { CheckedInputRadio, UnCheckedInputRadio } from "../../../../utils/svgs";

const VegNonVeg = ({
  homePageFilterOptionsObj,
  isActiveOption,
  handleFilterChange,
  filters,
}) => {
  const { vegNonVeg } = filters;
  return (
    <div className="sc-aXZVg jxDVMd">
      <div className="sc-eulNck gNHAci">
        <div
          className="sc-aXZVg hMjUKj"
          onClick={() => console.log(filters, " homePageFilterOptionsObj")}
        >
          Filter By
        </div>
      </div>
      <div className="sc-bXCLTC hcmGqD">
        {homePageFilterOptionsObj[isActiveOption]?.map((item) => {
          return (
            <div
              label="Relevance (Default)"
              orientation="ltr"
              className="sc-hmdomO biZBXM"
              key={item}
              style={{
                padding: "10px 0",
              }}
              onClick={() => handleFilterChange("vegNonVeg", item)}
            >
              <span className="custom-checkbox">
                <div>
                  {vegNonVeg === item ? (
                    <CheckedInputRadio />
                  ) : (
                    <UnCheckedInputRadio />
                  )}{" "}
                </div>
              </span>
              <label htmlFor="Sort-0" className="sc-aXZVg MCNps">
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VegNonVeg;
