import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { getHomePageData } from "../controller/homeController.js";

router.get("/getHomePageData", protectedRoutesWithParser, getHomePageData);

export default router;
