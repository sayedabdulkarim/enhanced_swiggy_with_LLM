import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSticky from "../../../hooks/useSticky"; // Import the custom hook

import {
  HomeFilterStripFilterIcon,
  HomeFilterStripSearchIcon,
  HomeFilterStripSortIcon,
} from "../../../utils/svgs";
import {
  setFilterModalOpen,
  setIsFilterStripStick,
} from "../../../slices/homeSlice";

const FilterStrip = () => {
  const stickyRef = useRef(null);
  const isSticky = useSticky(stickyRef);

  //misc
  const dispatch = useDispatch();
  const { isFilterStripStick } = useSelector((state) => state.homeReducer);
  //func
  const handleModalOpen = () => {
    dispatch(setFilterModalOpen(true));
  };

  //async
  useEffect(() => {
    dispatch(setIsFilterStripStick(isSticky));
  }, [isSticky, dispatch]);

  console.log({ isSticky, isFilterStripStick }, " isStickyisSticky");

  return (
    <div
      id="container-grid-filter-sort"
      className={`filterStrip_container sc-gVJvzJ cJbckw ${
        isFilterStripStick ? "makeSticky" : ""
      }`}
      ref={stickyRef}
    >
      <div>
        <div className="sc-eZYNyq Gwefh">
          <div className="sc-hHOBiw fUaZa">
            <div className="sc-ecPEgm hxCqch">
              <div
                className="sc-gdyeKB gymrnd"
                onClick={() => handleModalOpen()}
              >
                <div className="sc-aXZVg bjdsYL">Filter</div>
                <div className="sc-dSIIpw iOMfXs">
                  <HomeFilterStripFilterIcon />
                </div>
              </div>
            </div>

            <div className="sc-ecPEgm hxCqch">
              <div className="sc-dtInlm gyKZpB gymrnd">
                <div className="sc-aXZVg eNiJHh">Sort By</div>
                <div>
                  <HomeFilterStripSortIcon />
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">Fast Delivery</div>
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">New on Swiggy</div>
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">Ratings 4.0+</div>
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">Pure Veg</div>
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">Offers</div>
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">Rs. 300-Rs. 600</div>
                </div>
              </div>
            </div>
            <div className="sc-ecPEgm hxCqch">
              <div className="sc-kOPcWz jhtQvq gymrnd">
                <div className="contents">
                  <div className="sc-aXZVg eNiJHh">Less than Rs. 300</div>
                </div>
              </div>
            </div>
            {/*  */}
            {/* {isFilterStripStick ? <h1>Hello</h1> : ""} */}
            {isFilterStripStick ? (
              <div className="sc-bVHCgj hCdxdR search_box">
                <div className="sc-gvZAcH gPsFGd">
                  <button
                    type="button"
                    className="sc-koXPp fvWCFk sc-kRRyDe dxLavW"
                  >
                    <div className="sc-aXZVg bbEbJr sc-bmzYkS gcOyzI">
                      <div className="sc-aXZVg gvILiC">
                        Search for restaurant and food
                      </div>
                    </div>
                  </button>
                  <div>
                    <HomeFilterStripSearchIcon />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FilterStrip;
