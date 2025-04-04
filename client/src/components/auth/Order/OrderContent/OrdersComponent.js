import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderDetailsDrawerComponent from "../../../drawer/CustomDrawer";
import OrderDetailsDrawerContent from "./OrderDetailsDrawerContent";

import {
  formatUTCToLocal,
  getRestaurantById,
} from "../../../../utils/commonHelper";

const Orders = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [getCurrentOrderDetails, setCurrentOrderDetails] = useState(null);

  const homePageData = useSelector((state) => state.homeReducer.homePageData);
  // Check if userInfo is available
  if (
    !homePageData ||
    !homePageData.data ||
    !homePageData.data.userOrderDetails
  ) {
    return <div>Loading...</div>;
  }

  const {
    data: { userOrderDetails, allRestaurantsList },
  } = homePageData;

  //func
  const handleCloseOrderDetailsDrawer = () => {
    setIsShowDrawer(false);
  };

  const handleGetCurrentOrderDetails = (data) => {
    setIsShowDrawer(true);
    setCurrentOrderDetails(data);
  };

  return (
    <div className="order_details_component">
      <div
        className="title"
        onClick={() => console.log({ userOrderDetails, allRestaurantsList })}
      >
        {" "}
        Past Orders{" "}
      </div>
      {/*  */}
      {userOrderDetails?.map((item, idx) => {
        const { _id, createdAt, items, restaurantId, finalCost } = item;
        return (
          <div className="order_detail_item" key={_id}>
            {/*  */}
            <div className="item_top">
              <div className="item_top_image">
                <img
                  height="200"
                  width="300"
                  alt="img renderer"
                  src={`${
                    getRestaurantById(allRestaurantsList, restaurantId)
                      ?.cloudinaryImageId
                  }`}
                  // src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${
                  //   getRestaurantById(allRestaurantsList, restaurantId)
                  //     ?.cloudinaryImageId
                  // }`}
                />
              </div>
              <div className="item_top_restaurant_details">
                <div
                  className="title"
                  onClick={() =>
                    console.log(
                      getRestaurantById(allRestaurantsList, restaurantId),
                      " asdf"
                    )
                  }
                >
                  {getRestaurantById(allRestaurantsList, restaurantId)?.name}
                </div>
                <div className="sub_title">
                  {
                    getRestaurantById(allRestaurantsList, restaurantId)
                      ?.areaName
                  }
                </div>
                <div className="order_date">
                  ORDER #{_id} | {formatUTCToLocal(createdAt)}
                </div>
                <div
                  className="view-details"
                  // onClick={() => console.log(item, " itemm")}
                  onClick={() => handleGetCurrentOrderDetails(item)}
                >
                  VIEW DETAILS
                </div>
              </div>
            </div>
            {/*  */}
            <div className="item_bottom">
              {items?.map((o) => {
                const { name, count, _id } = o;
                return (
                  <div className=" item_count" key={_id}>
                    {name} x {count}
                  </div>
                );
              })}
              <div className=" reorder">
                <button className=" isActive">REORDER</button>
                <button className="">HELP</button>
              </div>
              <div className="payment">
                Total Paid: <span> {finalCost} </span>
              </div>
            </div>
          </div>
        );
      })}

      <OrderDetailsDrawerComponent
        title={`Order #${getCurrentOrderDetails?._id}`}
        open={isShowDrawer}
        placement={"right"}
        onClose={handleCloseOrderDetailsDrawer}
        width={480}
        className={"order_details_custom_drawer"}
      >
        {/* <AddressDrawerContentFromHome /> */}
        <OrderDetailsDrawerContent
          getCurrentOrderDetails={getCurrentOrderDetails}
          allRestaurantsList={allRestaurantsList}
        />
      </OrderDetailsDrawerComponent>
      <div className="order_detail_item" style={{ display: "none" }}>
        {/*  */}
        <div className="item_top">
          <div className="item_top_image">
            <img
              height="200"
              width="300"
              alt="img renderer"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_200,c_fill/cnlhkx4qw7vcrasx8the"
            />
          </div>
          <div className="item_top_restaurant_details">
            <div className="title">Chai Point</div>
            <div className="sub_title">Kalyan Nagar</div>
            <div className="order_date">
              ORDER #160896643069945 | Thu, Dec 7, 2023, 11:00 AM
            </div>
            <div className="view-details">VIEW DETAILS</div>
          </div>
        </div>
        {/*  */}
        <div className="item_bottom">
          <div className=" item_count">Banana Cake x 2</div>
          <div className=" reorder">
            <button className=" isActive">REORDER</button>
            <button className="">HELP</button>
          </div>
          <div className="payment">
            Total Paid: <span> 479 </span>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="showMore">Show More Orders</div>
    </div>
  );
};

export default Orders;
