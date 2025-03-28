import asyncHandler from "express-async-handler";
// Models
import UserModal from "../modals/userModal.js";
import AllRestaurantsModal from "../modals/home/allRestaurants.js";
import SingleRestaurantModal from "../modals/home/singleRestaurant.js";

// @desc Get restaurants details as per Id
// @route GET /api/users/getRestaurantDetailById/id
// @access PRIVATE
const getRestaurantDetailById = asyncHandler(async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Fetch basic restaurant details
    const restaurantDetails = await AllRestaurantsModal.findById(restaurantId);
    if (!restaurantDetails) {
      return res.status(404).send({ message: "Restaurant not found" });
    }

    // Fetch menu details for the restaurant
    const menuDetails = await SingleRestaurantModal.findOne({ restaurantId });

    res.status(200).json({
      data: {
        ...restaurantDetails.toObject(),
        menu: menuDetails,
      },
      message: "Restaurant details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error fetching restaurant details" });
  }
});

// @desc Add a restaurant to the user's favorites
// @route POST /api/users/addFavoriteRestaurant/:restaurantId
// @access PRIVATE
const addFavorite = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const userId = req.user._id; // Or however you access the authenticated user's ID
  // const { restaurantId } = req.body; // Get restaurantId from the request body

  try {
    // Assuming you have a method to check user's authentication and authorization
    // ...
    // Update user document by adding restaurantId to the favorites array
    const user = await UserModal.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: restaurantId } }, // $addToSet prevents duplicates
      { new: true }
    );
    console.log({
      userId,
      restaurantId,
      user,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      data: user,
      message: "Restaurant added to favorites successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error adding favorite" });
  }
});

// @desc Remove a restaurant from the user's favorites
// @route DELETE /api/users/removeFavorite/:restaurantId
// @access PRIVATE
const removeFavorite = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const userId = req.user._id; // Or however you access the authenticated user's ID
  try {
    // Assuming you have a method to check user's authentication and authorization
    // ...

    // Update user document by removing restaurantId from the favorites array
    const user = await UserModal.findByIdAndUpdate(
      userId,
      { $pull: { favorites: restaurantId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      data: user,
      message: "Restaurant removed from favorites successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error removing favorite" });
  }
});

export { getRestaurantDetailById, addFavorite, removeFavorite };
