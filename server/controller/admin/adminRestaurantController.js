import asyncHandler from "express-async-handler"; //
//modals
import AllRestaurantsModal from "../../modals/home/allRestaurants.js";

// @desc    Get restaurants by admin user ID
// @route   GET /api/admin/adminresturant
// @access  Private
const getRestaurantsByAdminUserId = asyncHandler(async (req, res) => {
  const adminUserId = req.adminuser._id; // Assuming the authenticated user ID is stored in req.adminuser._id

  // Find restaurants where 'adminUserId' matches the provided user ID
  const restaurants = await AllRestaurantsModal.findOne({ adminUserId });

  // console.log({
  //   adminUserId,
  //   restaurants,
  // });

  if (restaurants) {
    res.json(restaurants);
  } else {
    res.status(404);
    throw new Error("Restaurants not found");
  }
});

// @desc    Add a new restaurant
// @route   POST /api/admin/addrestaurant
// @access  Private
const addAdminRestaurant = asyncHandler(async (req, res) => {
  const adminUserId = req.adminuser._id; // Assuming the authenticated user ID is stored in req.user._id

  console.log(adminUserId, " adminUserIdadminUserIdadminUserIdadminUserId");

  const {
    aggregatedDiscountInfo,
    areaName,
    availability,
    avgRating,
    avgRatingString,
    badges,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    isOpen,
    name,
    sla,
    type,
    veg,
  } = req.body;

  // Create a new restaurant
  const restaurant = new AllRestaurantsModal({
    aggregatedDiscountInfoV3: aggregatedDiscountInfo,
    areaName,
    availability,
    avgRating,
    avgRatingString,
    badges,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    isOpen,
    name,
    sla,
    type,
    veg,
    adminUserId,
  });

  // Save the restaurant to the database
  const createdRestaurant = await restaurant.save();

  res.status(201).json({
    message: "New restaurant added successfully",
    restaurant: createdRestaurant,
  });
});

// const addAdminRestaurant = asyncHandler(async (req, res) => {
//   console.log(req.adminuser, "  req form addREsss");
//   //   const userId = req.user._id; // Or however you access the authenticated user's ID
//   //   console.log(userId, " userId fro,m addAdmin");
//   res.status(201).json({
//     message: "New restaurant added successfully",
//     // restaurant: adminUserId,
//   });
// });

export { addAdminRestaurant, getRestaurantsByAdminUserId };
