import React, { useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetRestaurantDetailsByIdQuery } from "../../apiSlices/restaurantDetailsApiSlice";
import { setRestaurantDetailsById } from "../../slices/restaurantSlice";
import RestaurantDetailsTopComponent from "../../components/auth/RestaurantDetails/RestaurantDetailsTopComponent";
import { Accordion } from "../../components/Accordion";
import ProgressBar from "../../components/ProgressBar";
import { setMenuBottomSlice } from "../../slices/menuBottomSlice";
import MenuStickBottom from "../../components/MenuStickBottom";
import RestaurantMenuModal from "../../components/modals/RestaurantMenuModal";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  //state
  const [isShowMenu, setIsShowMenu] = useState(false);
  //queries n mutation
  const {
    data: getRestaurantDetailById,
    isLoading: isLoadingRestaurantDetail,
  } = useGetRestaurantDetailsByIdQuery(id);
  // Redux state
  const { restaurantDetails } = useSelector(
    (state) => state.restaurantDetailReducer
  );

  const categories = useMemo(() => {
    return restaurantDetails?.data?.menu?.menu || [];
  }, [restaurantDetails]);

  //func
  const handleCategoryClick = (categoryName, cb) => {
    setActiveCategory(categoryName);
    cb();
  };

  //async
  useEffect(() => {
    if (getRestaurantDetailById) {
      dispatch(setRestaurantDetailsById(getRestaurantDetailById));
    }
  }, [getRestaurantDetailById, dispatch]);

  useEffect(() => {
    dispatch(setMenuBottomSlice(true));

    return () => dispatch(setMenuBottomSlice(false));
  }, [dispatch]);

  console.log({ restaurantDetails }, "restaurantDetails");
  //

  useEffect(() => {
    // Reset refs on categories change
    categoryRefs.current = categories.reduce((acc, category) => {
      acc[category.categoryName] = React.createRef();
      return acc;
    }, {});
  }, [categories]);

  useEffect(() => {
    if (activeCategory) {
      const ref = categoryRefs.current[activeCategory];
      if (ref && ref.current) {
        // Calculate the top offset of the element
        const offsetTop = ref.current.offsetTop;
        // Define the offset you want to apply. For example, 100 pixels for a fixed header
        const additionalOffset = 100; // Adjust this value as needed

        // Scroll to the element with the additional offset
        window.scrollTo({
          top: offsetTop - additionalOffset,
          behavior: "smooth",
        });

        // Apply the background color highlight
        ref.current.style.backgroundColor = "#5D8ED5";
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.backgroundColor = "";
          }
        }, 3000);
      }
    }
  }, [activeCategory]);

  return (
    <div className="nDVxx restaurant_details_section">
      <ProgressBar
        onStart={isLoadingRestaurantDetail}
        onEnd={!isLoadingRestaurantDetail}
      />

      <div className="OF_5P restaurant_details_container">
        {/* <button
          onClick={() =>
            console.log(
              restaurantDetails?.data,
              "restaurantDetailsrestaurantDetails"
            )
          }
        >
          restaurantDetails
        </button> */}
        {/* top_section */}
        {isLoadingRestaurantDetail ? (
          <Skeleton active paragraph={{ rows: 20 }} />
        ) : (
          <>
            <RestaurantDetailsTopComponent
              restaurantDetails={restaurantDetails?.data}
            />

            {restaurantDetails?.data?.menu ? (
              <>
                {/* bottom_section */}
                <Accordion
                  categories={restaurantDetails?.data?.menu?.menu || []}
                  categoryRefs={categoryRefs}
                />

                {/* menu stick bottom */}
                <RestaurantMenuModal
                  isShowMenu={isShowMenu}
                  setIsShowMenu={setIsShowMenu}
                  restaurantCategories={
                    restaurantDetails?.data?.menu?.menu || []
                  }
                  onCategoryClick={handleCategoryClick}
                />
                <MenuStickBottom
                  isShowMenu={isShowMenu}
                  setIsShowMenu={setIsShowMenu}
                />
              </>
            ) : (
              <div
                className="open-shortly-container"
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  margin: "30px 0",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                }}
              >
                <img
                  src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif"
                  alt="Restaurant preparing"
                  style={{
                    width: "200px",
                    marginBottom: "25px",
                    borderRadius: "8px",
                  }}
                />
                <h2
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    marginBottom: "15px",
                  }}
                >
                  Opening Shortly
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "20px",
                  }}
                >
                  This restaurant is getting ready to serve you delicious food.
                </p>
                <p style={{ fontSize: "16px", color: "#666" }}>
                  The menu will be available soon. Please check back later!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
