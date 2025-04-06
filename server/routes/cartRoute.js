import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { addOrder, submitReview } from "../controller/cartController.js";

router.post("/addOrder", protectedRoutesWithParser, addOrder);
router.post("/submitReview/:orderId", protectedRoutesWithParser, submitReview);

export default router;
