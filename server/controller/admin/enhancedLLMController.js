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

// @desc    Generate menu item description from features
// @route   POST /api/llm/generate-description
// @access  Public
const generateMenuItemDescription = asyncHandler(async (req, res) => {
  try {
    const { features } = req.body;

    if (!features || typeof features !== "string" || features.trim() === "") {
      return res.status(400).json({
        message:
          "Please provide features/keywords as a string in the request body",
      });
    }

    // Use the features string directly in the prompt
    const featuresString = features.trim();

    // Create a prompt for the LLM to generate a menu item description
    const prompt = `You are a professional food writer specializing in compelling menu descriptions.
Create an engaging and appetizing description for a menu item with these features/keywords: ${featuresString}.
The description should be between 25-50 words, be persuasive, highlight the unique selling points, 
and make the dish sound appealing to customers.
Return ONLY the description text without any additional commentary or formatting.`;

    // Call the LLM inference using fetch
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:1b",
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Extract the generated description
    const generatedDescription = data.response.trim();

    // Return the generated description
    res.status(200).json({
      features: featuresString,
      description: generatedDescription,
      model: "llama3.2:1b",
    });
  } catch (error) {
    console.error("Error generating menu item description:", error);
    res.status(500).json({
      message: "Failed to generate description",
      error: error.message,
    });
  }
});

export { processModelInference, generateMenuItemDescription };
