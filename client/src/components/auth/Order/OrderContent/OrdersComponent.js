import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderDetailsDrawerComponent from "../../../drawer/CustomDrawer";
import OrderDetailsDrawerContent from "./OrderDetailsDrawerContent";
import { Button, Modal, Rate, Input, message } from "antd";
import { useSubmitReviewMutation } from "../../../../apiSlices/cartApiSlice";
import {
  formatUTCToLocal,
  getRestaurantById,
} from "../../../../utils/commonHelper";

const Orders = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [getCurrentOrderDetails, setCurrentOrderDetails] = useState(null);
  // Review modal states
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [currentOrderForReview, setCurrentOrderForReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // API mutation hook
  const [submitReview, { isLoading: isSubmittingReview }] =
    useSubmitReviewMutation();

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

  // Review handling functions
  const showReviewModal = (order) => {
    setCurrentOrderForReview(order);
    setReviewRating(order.rating || 0);
    setReviewText(order.review || "");
    setIsReviewModalVisible(true);
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
    setCurrentOrderForReview(null);
    setReviewRating(0);
    setReviewText("");
  };

  const handleReviewSubmit = async () => {
    if (!reviewRating && !reviewText) {
      message.error("Please provide either a rating or a review");
      return;
    }

    try {
      const response = await submitReview({
        orderId: currentOrderForReview._id,
        reviewData: {
          rating: reviewRating,
          review: reviewText,
        },
      }).unwrap();
      console.log(response, " resss");
      message.success(response?.message || "Review submitted successfully");
      handleReviewCancel();
      // You might want to refresh the orders list here
    } catch (error) {
      message.error(error?.data?.message || "Failed to submit review");
      console.error(error);
    }
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
        const { _id, createdAt, items, restaurantId, finalCost, status } = item;
        return (
          <div className="order_detail_item" key={_id}>
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
                  onClick={() => handleGetCurrentOrderDetails(item)}
                >
                  VIEW DETAILS
                </div>
              </div>
            </div>
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
                {status === "accept" && (
                  <button
                    className="review-btn"
                    onClick={() => showReviewModal(item)}
                  >
                    REVIEW
                  </button>
                )}
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
        <OrderDetailsDrawerContent
          getCurrentOrderDetails={getCurrentOrderDetails}
          allRestaurantsList={allRestaurantsList}
        />
      </OrderDetailsDrawerComponent>

      {/* Review Modal */}
      <Modal
        title="Write a Review"
        open={isReviewModalVisible}
        onCancel={handleReviewCancel}
        footer={[
          <Button key="back" onClick={handleReviewCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmittingReview}
            onClick={handleReviewSubmit}
          >
            Submit Review
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <p>Rate your experience:</p>
          <Rate allowHalf value={reviewRating} onChange={setReviewRating} />
        </div>
        <div>
          <p>Share your thoughts:</p>
          <Input.TextArea
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell us about your experience..."
          />
        </div>
      </Modal>

      <div className="order_detail_item" style={{ display: "none" }}>
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
      <div className="showMore">Show More Orders</div>
    </div>
  );
};

export default Orders;
