import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { addOrder } from "../controller/cartController.js";

router.post("/addOrder", protectedRoutesWithParser, addOrder);

export default router;
