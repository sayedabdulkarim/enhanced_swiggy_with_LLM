import express from "express";
const router = express.Router();

import { protectedAdminRoutesWithParser } from "../../middleware/authMiddleware.js";
import {
  getOrdersDetailsFromRestaurantId,
  updateOrderItemStatus,
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

export default router;
