import express from "express";
import {
  processModelInference,
  generateMenuItemDescription,
  searchRestaurantsWithLLM,
} from "../../controller/admin/enhancedLlmController.js";

const router = express.Router();

// Route for model inference
router.post("/inference", processModelInference);

// Route for generating menu item descriptions
router.post("/generate-description", generateMenuItemDescription);

// Route for searching restaurants - changed from GET to POST
router.post("/search-restaurants", searchRestaurantsWithLLM);

export default router;
