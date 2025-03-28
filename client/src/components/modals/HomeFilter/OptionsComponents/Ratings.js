import React from "react";
import { CheckedInput, UnCheckedInput } from "../../../../utils/svgs";

const Ratings = ({
  homePageFilterOptionsObj,
  isActiveOption,
  handleFilterChange,
  filters,
}) => {
  const { rating } = filters;
  return (
    <div className="sc-aXZVg jxDVMd">
      <div className="sc-eulNck gNHAci">
        <div
          className="sc-aXZVg hMjUKj"
          onClick={() => console.log({ filters })}
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
              onClick={() => handleFilterChange("rating", item)}
            >
              <span class="custom-checkbox">
                <div>
                  {rating?.includes(item) ? (
                    <CheckedInput />
                  ) : (
                    <UnCheckedInput />
                  )}
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

export default Ratings;
