import express from "express";
const router = express.Router();

import { protectedAdminRoutesWithParser } from "../../middleware/authMiddleware.js";
import {
  getOrdersDetailsFromRestaurantId,
  updateOrderItemStatus,
  getRestaurantReviewsAnalysis,
} from "../../controller/admin/adminOrderController.js";

router.get(
  "/ordersdetails/:restaurantId",
  protectedAdminRoutesWithParser,
  getOrdersDetailsFromRestaurantId
);

router.put(
  "/updateOrderStatus/:restaurantId",
  protectedAdminRoutesWithParser,
  updateOrderItemStatus
);

router.get(
  "/order-reviews/:restaurantId",
  protectedAdminRoutesWithParser,
  getRestaurantReviewsAnalysis
);

export default router;
