import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  addressDetails: {
    address: String,
    doorNumber: String,
    landmark: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    type: {
      type: String,
      enum: ["Home", "Work", "Other"],
    },
  },
  items: [
    {
      name: { type: String, required: true },
      description: String,
      imageId: String,
      inStock: Boolean,
      price: { type: Number, required: true },
      variants: [{}], // This can be more detailed based on your variant structure
      offers: [{}], // Similarly, adjust as needed for your offers structure
      // _id: { type: String, required: true },
      count: { type: Number, required: true, min: 1 },
    },
  ],
  cancelledReason: String,
  status: {
    type: String,
    required: true,
    enum: ["active", "accept", "completed", "reject", "pending"],
    default: "active",
  },
  finalCost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartModal = mongoose.model("Cart", cartSchema);

export default CartModal;
