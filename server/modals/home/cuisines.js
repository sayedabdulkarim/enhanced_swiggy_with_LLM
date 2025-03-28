import mongoose from "mongoose";

const FilterCuisineSchema = new mongoose.Schema({
  label: String,
  queryType: String,
});

const CuisinesModal = mongoose.model("Cuisines", FilterCuisineSchema);

export default CuisinesModal;
