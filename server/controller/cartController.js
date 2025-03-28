import asyncHandler from "express-async-handler";
import CartModal from "../modals/cartModal.js";

// @desc Add order for a user
// @route POST /api/users/addOrder
// @access PRIVATE
const addOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Extract order details from request body
  const { restaurantId, addressDetails, items, finalCost } = req.body;

  // Validate the request body
  if (
    !restaurantId ||
    !addressDetails ||
    !finalCost ||
    !items ||
    items.length === 0
  ) {
    res.status(400);
    throw new Error("Missing order details");
  }

  // Create a new order
  const newOrder = new CartModal({
    userId: userId,
    restaurantId: restaurantId,
    addressDetails: addressDetails,
    items: items,
    finalCost,
    status: "active", // or any other initial status
  });

  // Save the new order to the database
  const savedOrder = await newOrder.save();

  res.status(201).json({ savedOrder, message: "Added successfully." });
});

export { addOrder };
