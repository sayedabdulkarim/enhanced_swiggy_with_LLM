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

// @desc Submit rating and review for an order
// @route POST /api/carts/submitReview/:orderId
// @access PRIVATE
const submitReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;
  const { rating, review } = req.body;

  // Check if at least one of rating or review is provided
  if (!rating && !review) {
    res.status(400);
    throw new Error("Please provide either a rating or a review");
  }

  // Find the order
  const order = await CartModal.findById(orderId);

  // Check if order exists
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Verify the order belongs to the user
  if (order.userId.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to review this order");
  }

  // Check if order is completed (only completed orders can be reviewed)
  if (order.status !== "accept") {
    res.status(400);
    throw new Error("Only completed orders can be reviewed");
  }

  // Update the order with the rating and/or review
  const updateData = {};
  if (rating) updateData.rating = rating;
  if (review) updateData.review = review;

  // Set the updated time
  updateData.updatedAt = Date.now();

  const updatedOrder = await CartModal.findByIdAndUpdate(orderId, updateData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Review submitted successfully",
    order: updatedOrder,
  });
});

export { addOrder, submitReview };
