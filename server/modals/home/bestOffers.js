import mongoose from "mongoose";

const BestOffersSchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  image: String,
});

const BestOffersModal = mongoose.model("BestOffers", BestOffersSchema);

export default BestOffersModal;
