import mongoose from "mongoose";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import AllRestaurantsModal from "../modals/home/allRestaurants.js";
import { allRestaurantsTable } from "../dummyData/allRestaurantsTable.js";
dotenv.config();

// Connect to MongoDB
connectDb();

// Create a default admin user ID (using a fixed ObjectId for consistency)
const defaultAdminId = new mongoose.Types.ObjectId("650450421f5c5b11e8ec8e2d");

// Add adminUserId to each restaurant object
const restaurantsWithAdmin = allRestaurantsTable.map((restaurant) => ({
  ...restaurant,
  adminUserId: defaultAdminId,
}));

// Insert data with the added adminUserId
AllRestaurantsModal.insertMany(restaurantsWithAdmin)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
