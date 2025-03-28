import mongoose from "mongoose";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import AllRestaurantsModal from "../modals/home/allRestaurants.js";
import { allRestaurantsTable } from "../dummyData/allRestaurantsTable.js";
dotenv.config();
// Data to be inserted
// Connect to MongoDB
connectDb();

// Insert data
AllRestaurantsModal.insertMany(allRestaurantsTable)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
