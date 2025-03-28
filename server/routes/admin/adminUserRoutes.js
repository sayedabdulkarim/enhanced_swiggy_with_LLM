import express from "express";
const router = express.Router();

import {
  adminLogoutUser,
  adminUserLogin,
  adminUserSignUp,
} from "../../controller/admin/adminUserController.js";

router.post("/login", adminUserLogin);
router.post("/signup", adminUserSignUp);
router.post("/logout", adminLogoutUser);

export default router;
