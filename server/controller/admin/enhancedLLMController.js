import asyncHandler from "express-async-handler";
// Import the restaurant model - you may need to adjust the path based on your project structure
import AllRestaurantsModal from "../../modals/home/allRestaurants.js";

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

// @desc    Search restaurants using LLM
// @route   GET /api/llm/search-restaurants
// @access  Public
const searchRestaurantsWithLLM = asyncHandler(async (req, res) => {
  try {
    const { query, restaurants, requestId } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    console.log(
      `Processing search request ID: ${requestId} for query: "${query}"`
    );

    // Use restaurants from request body if provided, otherwise fetch from database
    let allRestaurantsList;
    if (restaurants && Array.isArray(restaurants) && restaurants.length > 0) {
      allRestaurantsList = restaurants;
      console.log(`Using ${restaurants.length} restaurants from request body`);
    } else {
      // Fetch all restaurants from the database
      allRestaurantsList = await AllRestaurantsModal.find();
      console.log(
        `Fetched ${allRestaurantsList.length} restaurants from database`
      );
    }

    if (!allRestaurantsList || allRestaurantsList.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found in database" });
    }

    // Create a prompt for the LLM that includes the user query and restaurant data
    const prompt = `You are a restaurant search assistant. 
Based on the user's query: "${query}", find the most relevant restaurants from this list:
${JSON.stringify(allRestaurantsList, null, 2)}

Return ONLY a JSON object that contains an array of restaurant names that match the query, in this format:
{ "matchingRestaurants": ["Restaurant Name 1", "Restaurant Name 2"] }
Do not include any other text in your response.`;

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

    const llmResponse = await response.json();
    const responseText = llmResponse.response;

    // Parse the LLM response to get matching restaurant names
    let matchingNames = [];
    try {
      // Find JSON content between curly braces
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsedJson = JSON.parse(jsonMatch[0]);
        matchingNames = parsedJson.matchingRestaurants || [];
      } else {
        throw new Error("Could not parse LLM response");
      }
    } catch (parseError) {
      console.error("Error parsing LLM response:", parseError);
    }

    // Filter restaurants based on the names returned by the LLM
    let matchingRestaurants = [];
    if (matchingNames && matchingNames.length > 0) {
      matchingRestaurants = allRestaurantsList.filter((restaurant) =>
        matchingNames.some(
          (name) =>
            restaurant.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(restaurant.name.toLowerCase())
        )
      );
    }

    // If still no matches, use a fallback method based on cuisines
    if (matchingRestaurants.length === 0) {
      const keywords = query.toLowerCase().split(" ");

      // Check for cuisine-related keywords
      const cuisineMatches = allRestaurantsList.filter(
        (restaurant) =>
          restaurant.cuisines &&
          restaurant.cuisines.some((cuisine) =>
            keywords.some((keyword) => cuisine.toLowerCase().includes(keyword))
          )
      );

      if (cuisineMatches.length > 0) {
        matchingRestaurants = cuisineMatches;
      }
    }

    // Return the results along with search metadata
    res.status(200).json({
      query: query,
      results: matchingRestaurants,
      resultsCount: matchingRestaurants.length,
      llmModel: "llama3.2:1b",
    });
  } catch (error) {
    console.error("Error in LLM-based restaurant search:", error);
    res.status(500).json({
      message: "Failed to perform LLM-enhanced search",
      error: error.message,
    });
  }
});

export {
  processModelInference,
  generateMenuItemDescription,
  searchRestaurantsWithLLM,
};
