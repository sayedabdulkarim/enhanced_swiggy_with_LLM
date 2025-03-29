import express from "express";
import { processModelInference } from "../../controller/admin/enhancedLlmController";

const router = express.Router();

// Route for model inference
router.post("/inference", processModelInference);

export default router;
