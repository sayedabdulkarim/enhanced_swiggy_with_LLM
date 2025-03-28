import mongoose from "mongoose";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import BestOffersModal from "../modals/home/bestOffers.js";
import TopRestaurantModel from "../modals/home/topRestaurants.js";
import { bestOffersTable } from "../dummyData/bestOffersTable.js";
import { topRestaurantsTable } from "../dummyData/topRestaurantsTable.js";

dotenv.config();
// Data to be inserted
// Connect to MongoDB
connectDb();

// Insert data
TopRestaurantModel.insertMany(topRestaurantsTable)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
