import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
//apiSLice
import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
//dispatcher
import { setHomePageData } from "../../slices/homeSlice";
//comps
import BestOffers from "../../components/auth/Home/BestOffers";
import TopRestaurantSection from "../../components/auth/Home/TopRestaurants";
//
import HomeFilter from "../../components/modals/HomeFilter";
import AllRestaurants from "../../components/auth/Home/AllRestaurants";
import ProgressBar from "../../components/ProgressBar";

const Home = () => {
  // Dispatch
  const dispatch = useDispatch();

  // RTK Query hook
  const {
    data: getHomePageData,
    refetch,
    isLoading: isLoadingHomePage,
  } = useGetHomePageDataQuery();

  useEffect(() => {
    if (getHomePageData) {
      dispatch(setHomePageData(getHomePageData));
    }
  }, [getHomePageData, dispatch]);

  return (
    <div className="home_container fXbKft">
      <ProgressBar onStart={isLoadingHomePage} onEnd={!isLoadingHomePage} />
      <HomeFilter />
      <BestOffers isLoadingHomePage={isLoadingHomePage} />
      <TopRestaurantSection isLoadingHomePage={isLoadingHomePage} />
      <AllRestaurants isLoadingHomePage={isLoadingHomePage} />
    </div>
  );
};

export default Home;
