import mongoose from "mongoose";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import RestaurantDetails from "../modals/home/singleRestaurant.js";
import { restaurantDetailsTable } from "../dummyData/restaurantDetailsTable.js";
dotenv.config();
// Data to be inserted
// Connect to MongoDB
connectDb();

// Insert data
RestaurantDetails.insertMany(restaurantDetailsTable)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
