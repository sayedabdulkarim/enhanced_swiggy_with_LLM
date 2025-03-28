import mongoose from "mongoose";

const topRestaurantSchema = new mongoose.Schema({
  name: String,
  cloudinaryImageId: String,
  locality: String,
  areaName: String,
  costForTwo: String,
  cuisines: [String], // Array of strings
  avgRating: Number,
  avgRatingString: String,
  totalRatingsString: String,
  badges: Boolean,
  aggregatedDiscountInfoV3: {
    header: String,
    subHeader: String,
  },
});

const TopRestaurantModel = mongoose.model(
  "TopRestaurants",
  topRestaurantSchema
);

export default TopRestaurantModel;
