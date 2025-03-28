import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  getRestaurantDetailById,
  addFavorite,
  removeFavorite,
} from "../controller/restaurantController.js";

router.get(
  "/getRestaurantDetails/:id",
  protectedRoutesWithParser,
  getRestaurantDetailById
);

router.post(
  "/addFavoriteRestaurant/:restaurantId",
  protectedRoutesWithParser,
  addFavorite
);

router.delete(
  "/removeFavoriteRestaurant/:restaurantId",
  protectedRoutesWithParser,
  removeFavorite
);

export default router;
