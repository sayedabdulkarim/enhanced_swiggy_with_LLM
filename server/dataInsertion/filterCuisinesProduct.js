import mongoose from "mongoose";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import CuisinesModal from "../modals/home/cuisines.js";
import { filterCuisinesTable } from "../dummyData/filterCuisinesTable.js";
dotenv.config();
// Data to be inserted
// Connect to MongoDB
connectDb();

// Insert data
CuisinesModal.insertMany(filterCuisinesTable)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
