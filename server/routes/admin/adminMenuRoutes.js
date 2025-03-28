import express from "express";
const router = express.Router();

import { protectedAdminRoutesWithParser } from "../../middleware/authMiddleware.js";
import {
  addCategoryToRestaurant,
  addItemToCategory,
  bulkUpdateItemStock,
  getRestaurantMenu,
  updateItemStock,
} from "../../controller/admin/adminMenuController.js";

router.post(
  "/menucategory/:restaurantId",
  protectedAdminRoutesWithParser,
  addCategoryToRestaurant
);

router.post(
  "/additem/:restaurantId/:categoryId",
  protectedAdminRoutesWithParser,
  addItemToCategory
);

router.get(
  "/menu/:restaurantId",
  protectedAdminRoutesWithParser,
  getRestaurantMenu
);

router.put(
  "/updatestock/:restaurantId/:itemId",
  protectedAdminRoutesWithParser,
  updateItemStock
);

router.put(
  "/bulkupdatestock/:restaurantId",
  protectedAdminRoutesWithParser,
  bulkUpdateItemStock
);

export default router;
