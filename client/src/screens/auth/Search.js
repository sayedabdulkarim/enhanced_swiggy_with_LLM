import React, { useState } from "react";
import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
import { useNavigate } from "react-router-dom";
import TopRestaurantOfferBadge from "../../components/svgs/TopRestaurantOfferBadge";
import { RestaurantsRatingStar } from "../../utils/svgs";
import { arrayToString } from "../../utils/commonHelper";

const Search = () => {
  //misc
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: getHomePageData,
    refetch,
    isLoading: isLoadingHomePage,
  } = useGetHomePageDataQuery();

  //func
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

  // Filter restaurants based on search query
  const filteredRestaurants = searchQuery
    ? getHomePageData?.data?.allRestaurantsList?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.cuisines &&
            item.cuisines.some((cuisine) =>
              cuisine.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      )
    : getHomePageData?.data?.allRestaurantsList;

  return (
    <div className="home_best_offers home_all_restaurants">
      {/* Search Bar */}
      <div
        className="search-container"
        style={{
          padding: "20px 0",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Search for restaurants or cuisines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      <div className="home_container">
        <div className="home_best_offers home_all_restaurants">
          <div className="TopRestaurantSection">
            <div className="Imagesdiv">
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                  padding: "0",
                  listStyle: "none",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >
                {filteredRestaurants?.map((item, index) => {
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
                      className="test"
                      onClick={() => handleNavigation(name, _id)}
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        transition: "transform 0.3s ease",
                        background: "#fff",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "translateY(-5px)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "translateY(0)")
                      }
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
                          style={{
                            width: "100%",
                            aspectRatio: "1/1",
                            objectFit: "cover",
                          }}
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
                            <span className="sc-aXZVg jxDVMd">
                              {avgRating} •{" "}
                            </span>
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
      </div>
    </div>
  );
};

export default Search;
