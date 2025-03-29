import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopRestaurantOfferBadge from "../../svgs/TopRestaurantOfferBadge";
import { RestaurantsRatingStar } from "../../../utils/svgs";
import { arrayToString, isRestaurantOpen } from "../../../utils/commonHelper";
import FilterStrip from "./FilterStrip";
const AllRestaurants = ({ isLoadingHomePage }) => {
  //misc
  const navigate = useNavigate();
  // Redux state
  const { filteredAllRestaurantData } = useSelector(
    (state) => state.homeReducer
  );
  const homePageData = useSelector((state) => state.homeReducer.homePageData);
  const allRestaurantsList = useMemo(() => {
    return homePageData?.data?.allRestaurantsList || [];
  }, [homePageData?.data?.allRestaurantsList]);

  const filteredRestaurantsList = useMemo(() => {
    return filteredAllRestaurantData || [];
  }, [filteredAllRestaurantData]);
  //state
  const [currentRestaurants, setCurrentRestaurants] = useState([]);
  //func
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

  //async
  useEffect(() => {
    const listToUse =
      filteredRestaurantsList.length > 0
        ? filteredRestaurantsList
        : allRestaurantsList;
    setCurrentRestaurants(listToUse);
  }, [filteredRestaurantsList, allRestaurantsList, currentRestaurants]);
  return (
    <div className="home_best_offers home_all_restaurants">
      <div className="sc-esYiGF cfAhyi title_section">
        <div className="sc-fXSgeo FedBt">
          <h2
            onClick={() => console.log(allRestaurantsList)}
            className="sc-aXZVg fRsBsl title"
          >
            Restaurants with online food delivery in Bangalore
          </h2>
          <div className="sc-aXZVg dtXMSY"></div>
        </div>
      </div>

      <FilterStrip />

      <div className="TopRestaurantSection">
        <div className="Imagesdiv">
          <ul>
            {currentRestaurants.map((item, index) => {
              const {
                _id,
                badges,
                cloudinaryImageId,
                name,
                aggregatedDiscountInfoV3,
                avgRating,
                sla,
                cuisines,
                areaName,
                availability,
              } = item;

              return (
                <li
                  key={_id}
                  onClick={() => handleNavigation(name, _id)}
                  //TODO: to check start n end date
                  // className={`${
                  //   isRestaurantOpen(
                  //     availability?.startTime,
                  //     availability?.nextCloseTime
                  //   )
                  //     ? ""
                  //     : "isCLosed"
                  // }`}
                >
                  {<TopRestaurantOfferBadge isShow={badges} />}
                  <div className="image_wrapper">
                    <img
                      src={
                        cloudinaryImageId.startsWith("data:image")
                          ? cloudinaryImageId
                          : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${cloudinaryImageId}`
                      }
                      alt={name}
                      loading="lazy"
                    />

                    <div className="sc-gFqAkR ijUZYo sc-feUZmu fdeemW">
                      <div className="sc-aXZVg bBhNat sc-ikkxIA fUpspG">
                        {" "}
                        {aggregatedDiscountInfoV3 &&
                          `${aggregatedDiscountInfoV3?.header} ${aggregatedDiscountInfoV3?.subHeader}`}
                      </div>
                    </div>
                  </div>
                  {/* detail wrapper */}
                  <div className="detail_wrapper">
                    <div>
                      <div
                        className="sc-aXZVg kIsYLE"
                        onClick={() => console.log(item, " itemm")}
                      >
                        {name}
                      </div>
                    </div>
                    <div className="sw-restaurant-card-subtext-container">
                      <div>
                        <RestaurantsRatingStar />
                      </div>
                      <div className="sc-aXZVg icltun">
                        <span className="sc-aXZVg jxDVMd">{avgRating} • </span>
                        {sla?.deliveryTime || 0} mins
                      </div>
                    </div>
                    <div className="sw-restaurant-card-descriptions-container">
                      <div className="sc-aXZVg ftrPfO">
                        {arrayToString(cuisines)}
                      </div>
                      <div className="sc-aXZVg ftrPfO">{areaName}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurants;
