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

const ItemSchema = new mongoose.Schema({
  // id: String,
  name: { type: String, required: true },
  description: String,
  imageId: String,
  inStock: Boolean,
  price: Number,
  variants: [{}],
  attributes: {
    vegClassifier: String,
  },
  ratings: {
    rating: Number,
    ratingCount: Number,
  },
  offers: [OfferSchema],
});

const MenuCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  // items: [{ type: ItemSchema, _id: false }],
  items: [{ type: ItemSchema }],
});

const RestaurantDetails = new mongoose.Schema({
  restaurantId: { type: String, required: true, unique: true },
  menu: [MenuCategorySchema],
});

const Restaurant = mongoose.model("RestaurantDetails", RestaurantDetails);

export default Restaurant;
