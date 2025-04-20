import express from "express";
const router = express.Router();

import {
  processModelInference,
  generateMenuItemDescription,
  searchRestaurantsWithLLM,
  searchRestaurantsWithElastic,
  getPersonalizedRecommendations,
} from "../../controller/admin/enhancedLLmController.js";

// Route for model inference
router.post("/inference", processModelInference);

// Route for generating menu item descriptions
router.post("/generate-description", generateMenuItemDescription);

// Route for searching restaurants using LLM
router.post("/search-restaurants", searchRestaurantsWithLLM);

// Route for searching restaurants using Elasticsearch
router.post("/elastic-search", searchRestaurantsWithElastic);

// Route for personalized recommendations
router.get("/personalized-recommendations", getPersonalizedRecommendations);

export default router;
