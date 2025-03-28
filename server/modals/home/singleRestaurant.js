import mongoose from "mongoose";

//offerSchema starts
const OfferInfoSchema = new mongoose.Schema({
  header: String,
  offerTagColor: String,
  offerIds: [String],
  expiryTime: String,
  couponCode: String,
  description: String,
  offerType: String,
  restId: String,
  offerLogo: String,
  descriptionTextColor: String,
  offerTag: String,
  logoBottom: String,
});

const OfferCTASchema = new mongoose.Schema({
  type: String,
});

const OfferSchema = new mongoose.Schema({
  info: OfferInfoSchema,
  cta: OfferCTASchema,
});
//offerSchema end

const ItemSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    description: String,
    imageId: String,
    inStock: Boolean,
    price: Number,
    variants: [{}],
    variantsV2: {},
    itemAttribute: {
      vegClassifier: String,
    },
    ribbon: {},
    type: String,
    itemBadge: {},
    badgesV2: {},
    ratings: {
      aggregatedRating: {
        rating: String,
        ratingCount: String,
        ratingCountV2: String,
      },
    },
    offers: [OfferSchema],
  },
  { _id: false }
); // Prevent Mongoose from adding an _id field to each item

const MenuCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  items: [ItemSchema],
});

const RestaurantDetails = new mongoose.Schema({
  restaurantId: { type: String, required: true, unique: true },
  menu: [MenuCategorySchema],
});

const Restaurant = mongoose.model("RestaurantDetails", RestaurantDetails);

export default Restaurant;
