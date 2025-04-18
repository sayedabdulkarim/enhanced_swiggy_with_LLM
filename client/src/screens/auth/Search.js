import React, { useState, useEffect, useRef } from "react";
import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
import { useNavigate } from "react-router-dom";
import TopRestaurantOfferBadge from "../../components/svgs/TopRestaurantOfferBadge";
import { RestaurantsRatingStar } from "../../utils/svgs";
import { arrayToString } from "../../utils/commonHelper";
import {
  useSearchRestaurantsQuery,
  useElasticSearchRestaurantsQuery,
} from "../../apiSlices/llmApiSlice";

// Update the component with better error handling
const Search = () => {
  //misc
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const prevQueryRef = useRef("");
  const searchCountRef = useRef(0);
  const [searchMethod, setSearchMethod] = useState("llm"); // 'llm' or 'elastic'
  const [elasticSearchStatus, setElasticSearchStatus] = useState("unknown"); // 'available', 'unavailable', 'unknown'

  // Get home page data
  const { data: getHomePageData, isLoading: isLoadingHomePage } =
    useGetHomePageDataQuery();

  // Get all restaurants for passing to API
  const allRestaurants = getHomePageData?.data?.allRestaurantsList || [];

  // Only skip if no query or no restaurants
  const shouldSkipLLMSearch =
    !debouncedQuery || !allRestaurants.length || searchMethod !== "llm";
  const shouldSkipElasticSearch = !debouncedQuery || searchMethod !== "elastic";

  // LLM search API with improved skip logic
  const {
    data: llmSearchResults,
    isLoading: isLLMSearchLoading,
    error: llmSearchError,
    isFetching: isLLMSearchFetching,
  } = useSearchRestaurantsQuery(
    {
      query: debouncedQuery,
      restaurants: allRestaurants,
      requestId: `llm-${searchCountRef.current}`,
    },
    {
      skip: shouldSkipLLMSearch,
      refetchOnMountOrArgChange: true,
    }
  );

  // Elasticsearch API query
  const {
    data: elasticSearchResults,
    isLoading: isElasticSearchLoading,
    error: elasticSearchError,
    isFetching: isElasticSearchFetching,
  } = useElasticSearchRestaurantsQuery(
    {
      query: debouncedQuery,
      requestId: `elastic-${searchCountRef.current}`,
    },
    {
      skip: shouldSkipElasticSearch,
      refetchOnMountOrArgChange: true,
    }
  );

  // Determine current search results based on selected method
  const currentSearchResults =
    searchMethod === "llm" ? llmSearchResults : elasticSearchResults;
  const isSearchLoading =
    searchMethod === "llm" ? isLLMSearchLoading : isElasticSearchLoading;
  const isSearchFetching =
    searchMethod === "llm" ? isLLMSearchFetching : isElasticSearchFetching;
  const searchError =
    searchMethod === "llm" ? llmSearchError : elasticSearchError;

  const isLoading = isLLMSearchFetching || isElasticSearchFetching;

  // Improved console logging
  useEffect(() => {
    if (searchError) {
      console.error(
        `${searchMethod.toUpperCase()} Search API error:`,
        searchError
      );
    }
  }, [searchError, searchMethod]);

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

  // Add effect to check Elasticsearch availability on search method change
  useEffect(() => {
    if (searchMethod === "elastic" && elasticSearchStatus === "unknown") {
      // Make a simple test query
      fetch("/api/llm/elastic-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "test", requestId: "status-check" }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Elasticsearch status check:", data);

          // If the response indicates MongoDB fallback was used, Elasticsearch is unavailable
          if (data.searchMethod === "mongodb-fallback") {
            setElasticSearchStatus("unavailable");
            console.warn(
              "Elasticsearch is unavailable, using MongoDB fallback"
            );
          } else {
            setElasticSearchStatus("available");
            console.log("Elasticsearch is available");
          }
        })
        .catch((err) => {
          console.error("Elasticsearch status check error:", err);
          setElasticSearchStatus("unavailable");
        });
    }
  }, [searchMethod, elasticSearchStatus]);

  // Update the effect to check Elasticsearch availability immediately on component mount
  useEffect(() => {
    if (elasticSearchStatus === "unknown") {
      // Make a simple test query to check Elasticsearch availability on component mount
      fetch("/api/llm/elastic-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "test", requestId: "status-check" }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Elasticsearch status check:", data);

          // If the response indicates MongoDB fallback was used, Elasticsearch is unavailable
          if (data.searchMethod === "mongodb-fallback") {
            setElasticSearchStatus("unavailable");
            // If the user had selected Elasticsearch but it's unavailable, show a notification
            if (searchMethod === "elastic") {
              // Could add a toast notification here if you have a notification system
              console.warn(
                "Elasticsearch is unavailable, using MongoDB fallback"
              );
            }
          } else {
            setElasticSearchStatus("available");
            console.log("Elasticsearch is available");
          }
        })
        .catch((err) => {
          console.error("Elasticsearch status check error:", err);
          setElasticSearchStatus("unavailable");
        });
    }

    // Also check when search method changes to elastic
    if (searchMethod === "elastic" && elasticSearchStatus === "unavailable") {
      // Could show a more prominent notification here
      console.warn("User selected Elasticsearch but it's unavailable");
    }
  }, [searchMethod, elasticSearchStatus]);

  // Choose which restaurants to display
  const displayRestaurants =
    searchQuery && currentSearchResults?.results
      ? currentSearchResults.results
      : getHomePageData?.data?.allRestaurantsList || [];

  // Handle navigation
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

  // Handle search method change
  const handleSearchMethodChange = (e) => {
    setSearchMethod(e.target.value);
    if (debouncedQuery) {
      // Reset search counter to force new search
      searchCountRef.current += 1;
      console.log(`Switched search method to ${e.target.value}`);
    }
  };

  // Show a warning if elastic search is selected but unavailable
  const showElasticsearchWarning =
    searchMethod === "elastic" && elasticSearchStatus === "unavailable";

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
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Ask anything about restaurants or food... e.g Find me a good South Indian restaurant under ₹500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />

          {/* Search Method Selector with visual indicator when Elasticsearch is unavailable */}
          <select
            value={searchMethod}
            onChange={handleSearchMethodChange}
            style={{
              padding: "12px 15px",
              fontSize: "16px",
              borderRadius: "8px",
              border:
                elasticSearchStatus === "unavailable" &&
                searchMethod === "elastic"
                  ? "1px solid #f5c2c7"
                  : "1px solid #ddd",
              boxShadow:
                elasticSearchStatus === "" && searchMethod === "elastic"
                  ? "0 2px 5px rgba(220,53,69,0.2)"
                  : "0 2px 5px rgba(0,0,0,0.1)",
              background:
                elasticSearchStatus === "" && searchMethod === "elastic"
                  ? "#fff8f8"
                  : "#fff",
              cursor: "pointer",
            }}
          >
            <option value="llm">AI Search</option>
            <option value="elastic">
              {elasticSearchStatus === "unavailable"
                ? "Elasticsearch "
                : "Elasticsearch"}
            </option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "10px",
            fontSize: "14px",
            color: "#686b78",
          }}
        >
          {isLoading
            ? `Searching with ${
                searchMethod === "llm"
                  ? "AI"
                  : elasticSearchStatus === "unavailable"
                  ? "Elasticsearch"
                  : "Elasticsearch"
              }...`
            : searchError
            ? `Error: Could not perform search - ${
                searchError.message || "Unknown error"
              }`
            : searchQuery
            ? `${
                searchMethod === "llm"
                  ? "AI"
                  : currentSearchResults?.searchMethod === "mongodb-fallback"
                  ? "Elasticsearch"
                  : "Elasticsearch"
              } found ${
                currentSearchResults?.resultsCount || 0
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
                {isLLMSearchFetching || isElasticSearchFetching ? (
                  <div
                    style={{
                      gridColumn: "span 4",
                      textAlign: "center",
                      padding: "50px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div
                      className="loading-spinner-large"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "5px solid rgba(0, 0, 0, 0.1)",
                        borderLeft: "5px solid #fc8019",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                    <div>
                      Searching with{" "}
                      <span style={{ fontWeight: "bold", color: "#fc8019" }}>
                        {searchMethod === "llm" ? "AI" : "Elasticsearch"}
                      </span>
                      , please wait...
                    </div>
                    <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
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
