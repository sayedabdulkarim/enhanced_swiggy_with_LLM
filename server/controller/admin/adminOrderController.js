import asyncHandler from "express-async-handler"; //
//modals
import CartModal from "../../modals/cartModal.js";

// @desc    Get restaurant orders by restaurant ID
// @route   GET /api/admin/ordersdetails/:restaurantId
// @access  Private
const getOrdersDetailsFromRestaurantId = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  // Find all restaurant order details with the given restaurantId
  const restaurantOrdersDetails = await CartModal.find({
    restaurantId,
  });

  if (restaurantOrdersDetails.length > 0) {
    // Return the orders to the admin
    res.json({
      message: "Orders retrieved successfully",
      orders: restaurantOrdersDetails, // Changed restaurantMenu to orders for clarity
    });
  } else {
    // If no orders are found for the restaurant, send a 404 response
    res.status(404).json({
      message: "Restaurant has no orders.",
    });
  }
});

// @desc    Update order item status for a restaurant
// @route   PUT /api/admin/updateOrderStatus/:restaurantId
// @access  Private
const updateOrderItemStatus = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { orderId, itemId, newStatus, cancelledReason } = req.body;

  // console.log(
  //   {
  //     restaurantId,
  //     orderId,
  //     itemId,
  //     newStatus,
  //   },
  //   " checkck"
  // );
  // Find the specific order in the restaurant
  const order = await CartModal.findOne({
    _id: orderId,
    restaurantId: restaurantId,
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  if (newStatus === "reject" && cancelledReason) {
    order.cancelledReason = cancelledReason;
  }

  // Find the item in the order and update its status
  order.status = newStatus;
  // const item = order.items.find((item) => item._id.toString() === itemId);
  // if (item) {
  //   item.status = newStatus; // Update the status of the item
  // } else {
  //   return res.status(404).json({ message: "Item not found in order." });
  // }

  // Save the updated order
  await order.save();

  res.status(200).json({
    message: "Order item status updated successfully",
    order: order,
  });
});

export { getOrdersDetailsFromRestaurantId, updateOrderItemStatus };
