import asyncHandler from "express-async-handler";

// @desc    Process model inference request
// @route   POST /api/llm/inference
// @access  Public
const processModelInference = asyncHandler(async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt || !model) {
    res.status(400);
    throw new Error("Prompt and model name are required");
  }

  try {
    // Use native fetch API instead of axios
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Return the response
    return res.status(200).json({
      model: model,
      prompt: prompt,
      response: data.response,
    });
  } catch (error) {
    console.error("Error during model inference:", error);
    res.status(500);
    throw new Error(`Failed to get model inference: ${error.message}`);
  }
});

export { processModelInference };
