import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true, // Ensure phone numbers are unique
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AllRestaurant", // Replace 'RestaurantItem' with whatever your restaurant item model is called
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModal = mongoose.model("User", userSchema);

export default UserModal;
