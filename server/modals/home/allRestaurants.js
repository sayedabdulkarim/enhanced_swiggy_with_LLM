import mongoose from "mongoose";

const { Schema } = mongoose;

const imageBadgeSchema = new Schema({
  imageId: String,
  description: String,
});

const textExtendedBadgeSchema = new Schema({
  iconId: String,
  shortDescription: String,
  fontColor: String,
});

const badgesSchema = new Schema({
  imageBadges: [imageBadgeSchema],
  textExtendedBadges: [textExtendedBadgeSchema],
});

const slaSchema = new Schema({
  deliveryTime: Number,
  lastMileTravel: Number,
  serviceability: String,
  slaString: String,
  lastMileTravelString: String,
  iconType: String,
});

const availabilitySchema = new Schema({
  startTime: String,
  nextCloseTime: String,
  opened: Boolean,
});

const aggregatedDiscountInfoV3Schema = new Schema({
  header: String,
  subHeader: String,
  discountTag: String,
});

const restaurantSchema = new Schema({
  aggregatedDiscountInfoV3: aggregatedDiscountInfoV3Schema,
  areaName: String,
  availability: availabilitySchema,
  avgRating: Number,
  avgRatingString: String,
  // badges: badgesSchema,
  badges: Boolean,
  cloudinaryImageId: String,
  costForTwo: String,
  cuisines: [String],
  isOpen: Boolean,
  name: String,
  sla: slaSchema,
  totalRatingsString: String,
  type: String,
  veg: Boolean,
  adminUserId: {
    type: mongoose.Types.ObjectId,
    ref: "AdminUser", // assuming 'AdminUser' is your admin user model name
    required: false, // Change to false to make it optional
  },
});

const AllRestaurants = mongoose.model("AllRestaurant", restaurantSchema);

export default AllRestaurants;
