import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSticky from "../../../hooks/useSticky";
import { MoneyLogo, RestaurantTimeCostLogo } from "../../../utils/svgs";
import { arrayToString } from "../../../utils/commonHelper";
import { setRestaurantDetailsHeaderStick } from "../../../slices/restaurantSlice";
import {
  useAddFavoriteRestaurantMutation,
  useRemoveFavoriteRestaurantMutation,
} from "../../../apiSlices/restaurantDetailsApiSlice";
import { updateFavorites } from "../../../slices/authSlice";

const RestaurantDetailsTopComponent = ({ restaurantDetails }) => {
  //misc
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const stickyRef = useRef(null);
  const isSticky = useSticky(stickyRef);
  const [isFavorite, setIsFavorite] = useState(false);
  //queires n mutation
  const [
    addFavoriteRestaurant,
    { isLoading, isSuccess, data: addfavoritesData, isError, error },
  ] = useAddFavoriteRestaurantMutation();

  const [
    removeFavoriteRestaurant,
    {
      isLoading: isLoadingRemoveFavorite,
      isSuccess: isSuccessRemoveFavorite,
      data: removefavoritesData,
    },
  ] = useRemoveFavoriteRestaurantMutation();

  //func
  const handleAddFavorite = (restaurantId) => {
    addFavoriteRestaurant(restaurantId);
  };

  const handleRemoveFavorite = (restaurantId) => {
    removeFavoriteRestaurant(restaurantId);
  };

  //async
  useEffect(() => {
    if (userInfo && restaurantDetails) {
      const isPresent = userInfo?.data?.favorites?.includes(
        restaurantDetails?._id
      );
      setIsFavorite(isPresent ?? false);
    }
  }, [userInfo, restaurantDetails]);

  useEffect(() => {
    dispatch(setRestaurantDetailsHeaderStick(isSticky));
  }, [isSticky, dispatch]);

  useEffect(() => {
    //for adding fav
    if (isSuccess && addfavoritesData) {
      dispatch(updateFavorites(addfavoritesData?.data?.favorites));
    }
    //for removing fav
    if (isSuccessRemoveFavorite && removefavoritesData) {
      dispatch(updateFavorites(removefavoritesData?.data?.favorites));
    }
  }, [
    isSuccess,
    isSuccessRemoveFavorite,
    addfavoritesData,
    removefavoritesData,
    dispatch,
  ]);

  if (!restaurantDetails) {
    // Render a loading indicator or null if the data is not yet available
    return <div>Loading...</div>; // Or return null;
  }

  const {
    _id,
    name,
    cuisines,
    areaName,
    costForTwo,
    sla,
    avgRating,
    totalRatingsString,
  } = restaurantDetails;

  return (
    <>
      {/* breadcrumb_sec */}
      <div
        className={`_2p-Tc _3jpiZ breadcrumb_container ${
          isSticky ? "restaurant_details_header_sticky" : ""
        }`}
        ref={stickyRef}
      >
        <div className="left_section">
          {isSticky ? (
            <>
              <h5 className="hotelName">{name}</h5>
              <span className="duration">{sla?.deliveryTime} mins</span>
            </>
          ) : (
            <>
              <span>
                <a
                  href="https://www.swiggy.com/"
                  data-url="/"
                  className="kpkwa"
                >
                  <span className="_3duMr">Home</span>
                </a>
              </span>
              <span className="_1yRfx"></span>
              <span>
                <a
                  href="https://www.swiggy.com/city/bangalore"
                  data-url="/city/bangalore"
                  className="kpkwa"
                >
                  <span className="_3duMr">Bangalore</span>
                </a>
              </span>
              <span className="_1yRfx"></span>
              <span
                className="kpkwa"
                onClick={() =>
                  console.log({ restaurantDetails }, " restaurantDetails")
                }
              >
                {name ?? ""}
              </span>
            </>
          )}
        </div>

        <div className="right_section">
          <div className="MenuTopHeader_rightNav__alWSF">
            <button
              className="MenuTopHeader_rightNavItem__3dysE"
              data-testid="menu-favorite-button"
              role="checkbox"
              aria-checked="false"
              aria-label="Mark as favourite"
              // onClick={() => handleAddFavorite(_id)}
              onClick={() =>
                isFavorite ? handleRemoveFavorite(_id) : handleAddFavorite(_id)
              }
            >
              <span
                className={`${
                  isFavorite
                    ? "MenuTopHeader_isFavorite__2Y6dD icon-heart"
                    : "icon-heartInverse"
                }`}
                style={{ color: isFavorite ? "red" : "" }}
              ></span>
            </button>
            <button
              className="MenuTopHeader_rightNavItem__3dysE"
              data-cy="menu-search-button"
              aria-label="Search items"
            >
              <span className="icon-magnifier"></span>
            </button>
          </div>
        </div>
      </div>
      {/* breadcrumb_sec */}
      {/* prod details */}
      <div className="prod_details">
        <div className="top_section">
          {/*  */}
          <div className="left_section">
            <div aria-hidden="true" className="name_section">
              <p className="title">{name ?? ""}</p>
              <p className="cusines">{arrayToString(cuisines || [])}</p>
            </div>
            <div className="distance_section" aria-label="">
              <p className="address_area" aria-hidden="true">
                {areaName ?? ""},{" "}
              </p>
              <p className="address_lastMile" aria-hidden="true">
                {sla?.lastMileTravel} km
              </p>
            </div>
          </div>
          {/*  */}
          <div className="right_section">
            <span className="avgRating" aria-hidden="true">
              <span className="icon-star"></span> <span>{avgRating ?? ""}</span>{" "}
            </span>
            <span className="totalRatings" aria-hidden="true">
              {totalRatingsString ?? ""} ratings
            </span>
          </div>
        </div>

        <div className="mid_section">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/v1648635511/Delivery_fee_new_cjxumu"
            alt="DISTANCE_FEE_NON_FOOD_LM"
            aria-hidden="true"
          />
          <span className="message_text" aria-hidden="true">
            {sla?.lastMileTravel} kms | ₹34 Delivery fee will apply
          </span>
        </div>

        <hr className="dotted_separator" aria-hidden="true"></hr>

        <div className="below_section">
          {/* time cost */}
          <ul className="timeCost_wrapper">
            <li>
              <RestaurantTimeCostLogo />
              <span>{sla?.deliveryTime} MINS</span>
            </li>
            <li>
              <MoneyLogo />
              <span>{costForTwo ?? ""}</span>
            </li>
          </ul>
          {/* time cost */}
        </div>
      </div>
      {/* prod details */}
    </>
  );
};

export default RestaurantDetailsTopComponent;
