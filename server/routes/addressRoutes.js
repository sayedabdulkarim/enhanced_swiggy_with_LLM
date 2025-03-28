import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addAddress,
  getAddressesByUser,
} from "../controller/addressController.js";

router.post("/addAddress", protectedRoutesWithParser, addAddress);
router.get(
  "/getAddressesByUser",
  protectedRoutesWithParser,
  getAddressesByUser
);

export default router;
