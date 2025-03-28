import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { useDispatch } from "react-redux";
import OrderHeader from "../../components/auth/Order/OrderHeader";
import OrderContent from "../../components/auth/Order/OrderContent";
//apiSLice
import { useGetAddressesByUserQuery } from "../../apiSlices/addressApiSlice";
import { useGetHomePageDataQuery } from "../../apiSlices/homeApiSlice";
import { setHomePageData } from "../../slices/homeSlice";
import ProgressBar from "../../components/ProgressBar";

const Orders = () => {
  const dispatch = useDispatch();

  // RTK Query hook
  const {
    data: getHomePageData,
    refetch,
    isLoading: isLoadingHomePage,
  } = useGetHomePageDataQuery();

  const {
    data: getAddressData,
    refetch: getAddressDataRefetch,
    isLoading: isLoadingAddressData,
  } = useGetAddressesByUserQuery();

  //
  useEffect(() => {
    if (getHomePageData) {
      dispatch(setHomePageData(getHomePageData));
    }
  }, [getHomePageData, dispatch]);

  console.log({
    isLoadingAddressData,
    isLoadingHomePage,
  });

  const isLoading = isLoadingHomePage || isLoadingAddressData;

  return (
    <div className="order_component">
      {isLoading ? (
        <>
          <ProgressBar onStart={isLoading} onEnd={!isLoading} />
          <Skeleton active paragraph={{ rows: 15 }} />
        </>
      ) : (
        <div className="order_container">
          <OrderHeader />
          {/*  */}
          <OrderContent savedAddress={getAddressData} />
        </div>
      )}
    </div>
  );
};

export default Orders;
