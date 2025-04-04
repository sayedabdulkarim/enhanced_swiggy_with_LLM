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
            {/* bottom_section */}
            <Accordion
              categories={restaurantDetails?.data?.menu?.menu || []}
              categoryRefs={categoryRefs}
            />

            {/* menu stick bottom */}
            <RestaurantMenuModal
              isShowMenu={isShowMenu}
              setIsShowMenu={setIsShowMenu}
              restaurantCategories={restaurantDetails?.data?.menu?.menu || []}
              onCategoryClick={handleCategoryClick}
            />
            <MenuStickBottom
              isShowMenu={isShowMenu}
              setIsShowMenu={setIsShowMenu}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
