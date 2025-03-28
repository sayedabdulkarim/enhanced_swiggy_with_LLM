import express from "express";
const router = express.Router();

import {
  addAdminRestaurant,
  getRestaurantsByAdminUserId,
} from "../../controller/admin/adminRestaurantController.js";
import { protectedAdminRoutesWithParser } from "../../middleware/authMiddleware.js";

router.post(
  "/addrestaurant",
  protectedAdminRoutesWithParser,
  addAdminRestaurant
);
router.get(
  "/adminrestaurant",
  protectedAdminRoutesWithParser,
  getRestaurantsByAdminUserId
);

export default router;
