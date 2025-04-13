import React from "react";
import {
  useGetPersonalizedRecommendationsQuery,
  useGetHomePageDataQuery,
} from "../../apiSlices/homeApiSlice";
import { useNavigate } from "react-router-dom";
import TopRestaurantOfferBadge from "../../components/svgs/TopRestaurantOfferBadge";
import { RestaurantsRatingStar } from "../../utils/svgs";
import { arrayToString } from "../../utils/commonHelper";
import { useSelector } from "react-redux";

const Recommendation = () => {
  // Navigation hook
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authReducer);

  const userId = userInfo?.data?._id || null;

  // Skip fetching recommendations if userId is null
  const {
    data: recommendationsData,
    isLoading: isLoadingRecommendations,
    error: recommendationsError,
    isFetching: isFetchingRecommendations,
  } = useGetPersonalizedRecommendationsQuery(userId, {
    skip: !userId, // Skip the API call if userId is null
  });

  // Get home page data to access all restaurants
  const { data: homePageData, isLoading: isLoadingHomePage } =
    useGetHomePageDataQuery();

  // All restaurants data
  const allRestaurants = homePageData?.data?.allRestaurantsList || [];

  // Handle navigation to restaurant details
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

  // Find restaurant details from recommendations
  const getRecommendedRestaurants = () => {
    if (!recommendationsData?.recommendations || !allRestaurants.length)
      return [];

    // Check if using dummy data
    if (recommendationsData.isDummyData) {
      // For dummy data, create restaurant objects based on recommendation names
      return recommendationsData.recommendations.map((rec) => {
        // Try to find a matching restaurant in allRestaurants first
        const matchingRestaurant = allRestaurants.find(
          (r) => r.name.toLowerCase() === rec.restaurantName.toLowerCase()
        );

        // If found, use actual restaurant data
        if (matchingRestaurant) {
          return {
            ...matchingRestaurant,
            recommendationReason: rec.reason,
          };
        }

        // Otherwise, create a dummy restaurant object with minimal data
        return {
          _id: `dummy-${Math.random().toString(36).substr(2, 9)}`,
          name: rec.restaurantName,
          cloudinaryImageId: "https://via.placeholder.com/300?text=Restaurant",
          avgRating: "4.5",
          cuisines: recommendationsData.userPreferences?.favoriteCuisines || [
            "Various",
          ],
          areaName: "Sample Area",
          sla: { deliveryTime: 30 },
          recommendationReason: rec.reason,
        };
      });
    }

    // For real data, use the original approach
    return recommendationsData.recommendations
      .map((rec) => {
        // Find the full restaurant details from allRestaurants
        const restaurant = allRestaurants.find(
          (r) => r.name.toLowerCase() === rec.restaurantName.toLowerCase()
        );

        // If found, return with recommendation reason
        if (restaurant) {
          return {
            ...restaurant,
            recommendationReason: rec.reason,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove any null entries
  };

  const recommendedRestaurants = getRecommendedRestaurants();

  // User preferences from the recommendation data
  const userPreferences = recommendationsData?.userPreferences || {
    favoriteCuisines: [],
    pricePreference: "",
    dietaryPreferences: "",
  };

  return (
    <div className="home_best_offers home_all_restaurants">
      {/* Recommendations Header */}
      <div
        className="recommendations-header"
        style={{
          padding: "20px 0",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Your Personalized Recommendations
        </h1>

        {!userId ? (
          <p style={{ color: "#5D8ED5", marginBottom: "20px" }}>
            Please log in to see your personalized recommendations
          </p>
        ) : isLoadingRecommendations || isFetchingRecommendations ? (
          <p>Loading your personalized recommendations...</p>
        ) : recommendationsError ? (
          <p style={{ color: "red" }}>
            Error loading recommendations:{" "}
            {recommendationsError.message || "Please try again later"}
          </p>
        ) : (
          <div style={{ marginBottom: "20px" }}>
            <p>
              Based on your previous orders, we think you'll love these
              restaurants!
            </p>
            {userPreferences.favoriteCuisines?.length > 0 && (
              <p>
                <strong>Your favorite cuisines:</strong>{" "}
                {userPreferences.favoriteCuisines.join(", ")}
              </p>
            )}
            {userPreferences.pricePreference && (
              <p>
                <strong>Price preference:</strong>{" "}
                {userPreferences.pricePreference}
              </p>
            )}
            {userPreferences.dietaryPreferences && (
              <p>
                <strong>Dietary preference:</strong>{" "}
                {userPreferences.dietaryPreferences}
              </p>
            )}
          </div>
        )}
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
                {!userId ? (
                  <div
                    style={{
                      gridColumn: "span 4",
                      textAlign: "center",
                      padding: "50px 0",
                    }}
                  >
                    <p>
                      Log in to get personalized restaurant recommendations
                      based on your order history
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        backgroundColor: "#FC8019",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      Log In
                    </button>
                  </div>
                ) : isLoadingRecommendations || isLoadingHomePage ? (
                  <div
                    style={{
                      gridColumn: "span 4",
                      textAlign: "center",
                      padding: "50px 0",
                    }}
                  >
                    Loading your personalized recommendations...
                  </div>
                ) : recommendedRestaurants.length === 0 ? (
                  <div
                    style={{
                      gridColumn: "span 4",
                      textAlign: "center",
                      padding: "50px 0",
                    }}
                  >
                    {recommendationsData
                      ? "No recommendations available. Place more orders to get personalized suggestions!"
                      : "Please log in to see your personalized recommendations"}
                  </div>
                ) : (
                  recommendedRestaurants.map((item) => {
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
                      recommendationReason,
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
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <TopRestaurantOfferBadge isShow={badges} />
                        <div className="image_wrapper">
                          <img
                            src={
                              !cloudinaryImageId ||
                              cloudinaryImageId.startsWith("http")
                                ? cloudinaryImageId ||
                                  "https://via.placeholder.com/300?text=Restaurant"
                                : cloudinaryImageId.startsWith("data:image")
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
                            <div className="sc-aXZVg kIsYLE">{name}</div>
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
                              {Array.isArray(cuisines)
                                ? arrayToString(cuisines)
                                : cuisines}
                            </div>
                            <div className="sc-aXZVg ftrPfO">{areaName}</div>
                          </div>

                          {/* Recommendation reason */}
                          {recommendationReason && (
                            <div
                              style={{
                                marginTop: "10px",
                                padding: "8px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "4px",
                                fontSize: "14px",
                                color: "#3e4152",
                                fontStyle: "italic",
                              }}
                            >
                              <strong>Why we recommend:</strong>{" "}
                              {recommendationReason}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
