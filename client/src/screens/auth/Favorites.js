import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import { useDispatch } from "react-redux";
import ProgressBar from "../../components/ProgressBar";

import FavoritesComponent from "../../components/auth/Favorites";

import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
import { setHomePageData } from "../../slices/homeSlice";
import { filterObjectsByIds } from "../../utils/commonHelper";

const Favorites = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  //state
  const [favoriteData, setFavoriteData] = useState(null);

  // RTK Query hook
  const {
    data: getHomePageData,
    refetch,
    isLoading: isLoadingHomePage,
  } = useGetHomePageDataQuery();

  //async
  useEffect(() => {
    if (getHomePageData) {
      dispatch(setHomePageData(getHomePageData));
    }
  }, [getHomePageData, dispatch]);
  //
  const isLoading = isLoadingHomePage || !userInfo;

  useEffect(() => {
    if (userInfo && getHomePageData) {
      const filteredData = filterObjectsByIds(
        getHomePageData?.data?.allRestaurantsList || [],
        userInfo?.data?.favorites || []
      );
      setFavoriteData(filteredData);
    }
  }, [userInfo, getHomePageData]);

  return (
    <div className=" favorite_container">
      {/* <h1
        onClick={() =>
          console.log({ getHomePageData, userInfo, favoriteData }, " gettt")
        }
      >
        click
      </h1> */}
      {isLoading ? (
        <>
          <ProgressBar onStart={isLoading} onEnd={!isLoading} />
          <Skeleton active paragraph={{ rows: 15 }} />
        </>
      ) : (
        <div className="order_container">
          <FavoritesComponent favoriteData={favoriteData} />
        </div>
      )}
    </div>
  );
};

export default Favorites;
