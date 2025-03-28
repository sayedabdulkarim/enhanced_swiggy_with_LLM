import React from "react";
import {
  calculateTotalPrice,
  getRestaurantById,
} from "../../../../../utils/commonHelper";

const Index = ({ getCurrentOrderDetails, allRestaurantsList }) => {
  const { restaurantId, addressDetails } = getCurrentOrderDetails;
  return (
    <div>
      {/*  */}
      <div className="location_details">
        <div className="location_details_container">
          {/*  */}
          <div className="restaurant_name">
            <div className="icon_container">
              <span className="icon-location"></span>
            </div>
            <div>
              <div
                className=" restaurant_title"
                onClick={() =>
                  console.log(
                    { getCurrentOrderDetails, allRestaurantsList },
                    " getCurrentOrderDetails"
                  )
                }
              >
                {getRestaurantById(allRestaurantsList, restaurantId)?.name}
              </div>
              <div className="area_name">
                {" "}
                {getRestaurantById(allRestaurantsList, restaurantId)?.areaName}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="restaurant_address_container">
            <div className=" icon_container">
              <span className="icon-location"></span>
            </div>
            <div className="detail_container">
              <div className=" address_type">{addressDetails?.type}</div>
              <div className=" address_det">{addressDetails?.address}</div>
            </div>
          </div>
          {/*  */}
        </div>
        <div className="divider"></div>
      </div>
      {/*  */}
      <div className="item_details">
        {/*  */}
        <div className="item_details_product">
          {getCurrentOrderDetails?.items?.map((item, idx) => {
            const totalItems = getCurrentOrderDetails?.items?.length;
            const { _id, count, name, price } = item;
            return (
              <div key={_id}>
                {idx === 0 ? (
                  <div className="count">
                    {totalItems} {`${totalItems > 1 ? "ITEMS" : "ITEM"}`}
                  </div>
                ) : null}
                <div className="desc_price">
                  <div className="desc">
                    <i
                      className="icon-NonVeg"
                      role="presentation"
                      aria-hidden="true"
                    ></i>
                    {name} x {count}
                  </div>
                  <div className="price">{price * count}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/*  */}
        <div className="_15Yxr price_description">
          <div className="price_description_item">
            <div className="price_description_item_container">
              <div className=" UCNHQ title">Item Total</div>
              <div>
                {/* <span className="_3IQOi text">278.00</span> */}
                <span className="_3IQOi text">
                  {calculateTotalPrice(getCurrentOrderDetails?.items)}
                </span>
              </div>
            </div>
          </div>
          <div className="price_description_item">
            <div className="price_description_item_container">
              <div className=" title">Order Packing Charges</div>
              <div>
                <span className=" text">30.00</span>
              </div>
            </div>
          </div>
          <div className="price_description_item">
            <div className="price_description_item_container">
              <div className="title">1 Month Plan Membership</div>
              <div>
                <span className="text">1.00</span>
              </div>
            </div>
          </div>
          <div className="price_description_item">
            <div className="price_description_item_container">
              <div className="title">Platform fee</div>
              <div>
                <span className="text">3.00</span>
              </div>
            </div>
          </div>
          <div className="price_description_item">
            <div className="price_description_item_container">
              <div className="title">Delivery partner fee</div>
              <div>
                <span className="text">153.00</span>
              </div>
            </div>
          </div>
          <div className="price_description_item">
            <div className="price_description_item_container">
              <div className="title">Taxes</div>
              <div>
                <span className="text">14.44</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="payment_details">
        <div className="payment_details_container">
          <div className=" via">Paid Via Cash</div>
          <div className=" total">
            <div className=" text">Bill Total</div>
            <div className="rupee">{getCurrentOrderDetails?.finalCost}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
