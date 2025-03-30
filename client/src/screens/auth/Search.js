import React from "react";
import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
import { useNavigate } from "react-router-dom";
import TopRestaurantOfferBadge from "../../components/svgs/TopRestaurantOfferBadge";
import { RestaurantsRatingStar } from "../../utils/svgs";
import { arrayToString } from "../../utils/commonHelper";

const Search = () => {
  //misc
  const navigate = useNavigate();
  const {
    data: getHomePageData,
    refetch,
    isLoading: isLoadingHomePage,
  } = useGetHomePageDataQuery();
  //func
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

  return (
    <div className="home_best_offers home_all_restaurants">
      <div className="TopRestaurantSection">
        <div className="Imagesdiv">
          <ul>
            {getHomePageData?.data?.allRestaurantsList?.map((item, index) => {
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
                <li key={_id} onClick={() => handleNavigation(name, _id)}>
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

export default Search;
