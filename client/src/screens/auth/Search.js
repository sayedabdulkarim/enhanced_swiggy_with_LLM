import React, { useState, useEffect, useRef } from "react";
import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
import { useNavigate } from "react-router-dom";
import TopRestaurantOfferBadge from "../../components/svgs/TopRestaurantOfferBadge";
import { RestaurantsRatingStar } from "../../utils/svgs";
import { arrayToString } from "../../utils/commonHelper";
import { useSearchRestaurantsQuery } from "../../apiSlices/llmApiSlice";

const Search = () => {
  //misc
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const prevQueryRef = useRef("");
  const searchCountRef = useRef(0);

  // Get home page data
  const { data: getHomePageData, isLoading: isLoadingHomePage } =
    useGetHomePageDataQuery();

  // Get all restaurants for passing to API
  const allRestaurants = getHomePageData?.data?.allRestaurantsList || [];

  // Only skip if no query or no restaurants
  const shouldSkipSearch = !debouncedQuery || !allRestaurants.length;

  // LLM search API with improved skip logic
  const {
    data: llmSearchResults,
    isLoading: isLLMSearchLoading,
    error: llmSearchError,
    isFetching: isSearchFetching,
  } = useSearchRestaurantsQuery(
    {
      query: debouncedQuery,
      restaurants: allRestaurants,
      requestId: searchCountRef.current,
    },
    {
      skip: shouldSkipSearch,
      refetchOnMountOrArgChange: true,
    }
  );

  // Improved console logging
  useEffect(() => {
    if (llmSearchError) {
      console.error("Search API error:", llmSearchError);
    }
  }, [llmSearchError]);

  // Debounce search input with a simpler approach
  useEffect(() => {
    if (!searchQuery) {
      setDebouncedQuery(""); // Clear debounced query when search is empty
      return;
    }

    console.log("Search query changed to:", searchQuery);

    const timer = setTimeout(() => {
      searchCountRef.current += 1;
      setDebouncedQuery(searchQuery);
      console.log(
        "Debounced query set to:",
        searchQuery,
        "with request ID:",
        searchCountRef.current
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Choose which restaurants to display
  const displayRestaurants =
    searchQuery && llmSearchResults?.results
      ? llmSearchResults.results
      : getHomePageData?.data?.allRestaurantsList || [];

  // Handle navigation
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

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
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Ask anything about restaurants or food..."
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

        <div
          style={{
            marginBottom: "10px",
            fontSize: "14px",
            color: "#686b78",
          }}
        >
          {isLLMSearchLoading
            ? "Searching with AI..."
            : llmSearchError
            ? `Error: Could not perform AI search - ${
                llmSearchError.message || "Unknown error"
              }`
            : searchQuery
            ? `AI found ${
                llmSearchResults?.resultsCount || 0
              } matches for "${searchQuery}"`
            : "Try asking for cuisine types, dietary preferences, or specific dishes"}
        </div>
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
                {isLLMSearchLoading && searchQuery ? (
                  <div
                    style={{
                      gridColumn: "span 4",
                      textAlign: "center",
                      padding: "50px 0",
                    }}
                  >
                    Searching with AI, please wait...
                  </div>
                ) : (
                  displayRestaurants?.map((item, index) => {
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
                        <TopRestaurantOfferBadge isShow={badges} />
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
                              {arrayToString(cuisines)}
                            </div>
                            <div className="sc-aXZVg ftrPfO">{areaName}</div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}

                {searchQuery && displayRestaurants?.length === 0 && (
                  <div
                    style={{
                      gridColumn: "span 4",
                      textAlign: "center",
                      padding: "50px 0",
                    }}
                  >
                    No restaurants found matching your search criteria
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
