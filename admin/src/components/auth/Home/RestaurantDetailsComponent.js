import React from "react";
import { useSelector } from "react-redux";
import { Rate, Tag, Card } from "antd";

const RestaurantDetailsComponent = ({
  restaurantDetails,
  userDetails,
  getOrdersDetailsFromRestaurantId,
}) => {
  const { restaurantMenuDetails } = useSelector((state) => state.menuReducer);
  if (!restaurantDetails) {
    return <div>Loading restaurant details...</div>;
  }

  const {
    _id,
    aggregatedDiscountInfoV3,
    areaName,
    availability,
    avgRating,
    avgRatingString,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    name,
    sla,
    type,
    adminUserId,
  } = restaurantDetails;

  // Add proper image URL handling here
  const imageUrl =
    cloudinaryImageId ||
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/bb7ae131544c7d37e10fc5faf76f09d6";

  return (
    <div className="restaurant_detail_container">
      <h1
        className="title"
        onClick={() =>
          console.log(
            {
              restaurantDetails,
              userDetails,
              restaurantMenuDetails,
              getOrdersDetailsFromRestaurantId,
            },
            " userDett"
          )
        }
      >
        Hello {userDetails?.name}
      </h1>

      <div className="wrapper">
        <Card className="left_section" bordered={false}>
          <img src={imageUrl} alt={name} className="restaurant_image" />
          <h2 className="keyName">{name}</h2>
          <Rate allowHalf defaultValue={avgRating} disabled />
          <p>{avgRatingString} out of 5</p>
          <p>
            <span className="smallKeyName">Type:</span> {type}
          </p>
          <p>
            <span className="smallKeyName">Area:</span> {areaName}
          </p>
        </Card>
        {/*  */}
        <Card className="right_section" bordered={false}>
          <h2 className="keyName">Details</h2>
          <p className="item">
            <span className="smallKeyName">Cost for Two:</span> {costForTwo}
          </p>
          <p className="item">
            <span className="smallKeyName">Availability:</span>{" "}
            {availability.isOpen ? "Open" : "Closed"}
          </p>
          <p className="item">
            <span className="smallKeyName">Delivery Time:</span>{" "}
            {sla.deliveryTime} mins
          </p>
          <p className="item">
            <span className="smallKeyName">Last Mile Travel:</span>{" "}
            {sla.lastMileTravel} km
          </p>
          <p className="item">
            <span className="smallKeyName">Cuisines: </span>{" "}
            {cuisines.map((cuisine) => (
              <Tag key={cuisine}>{cuisine}</Tag>
            ))}
          </p>
          <p className="item">
            <span className="smallKeyName">Discounts:</span>{" "}
            {aggregatedDiscountInfoV3.header} /{" "}
            {aggregatedDiscountInfoV3.subHeader}
          </p>
          {/* {aggregatedDiscountInfoV3 && (
            <Card title="Discounts" size="small">
              <p>{aggregatedDiscountInfoV3.header}</p>
              <p>{aggregatedDiscountInfoV3.subHeader}</p>
            </Card>
          )} */}
        </Card>
      </div>
    </div>
  );
};

export default RestaurantDetailsComponent;
