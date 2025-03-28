import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Restaurant from "../modals/home/singleRestaurant.js";
import { restaurantDetailsTable } from "../dummyData/restaurantDetailsTable.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const importData = async () => {
  try {
    // First, clear existing data
    await Restaurant.deleteMany();
    console.log("Existing restaurant details data deleted");

    // Insert new data
    const createdRestaurants = await Restaurant.create(restaurantDetailsTable);
    console.log(
      `${createdRestaurants.length} restaurant details imported successfully`
    );

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
