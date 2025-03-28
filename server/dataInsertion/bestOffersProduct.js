import mongoose from "mongoose";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import BestOffersModal from "../modals/home/bestOffers.js";
import { bestOffersTable } from "../dummyData/bestOffersTable.js";
dotenv.config();
// Data to be inserted
// Connect to MongoDB
connectDb();

// Insert data
BestOffersModal.insertMany(bestOffersTable)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
