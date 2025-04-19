import asyncHandler from "express-async-handler";
import AllRestaurantsModal from "../../modals/home/allRestaurants.js";
import CartModal from "../../modals/cartModal.js";
import {
  elasticClient,
  isElasticsearchAvailable,
} from "../../config/elasticSearch.js";

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
// const generateMenuItemDescription = asyncHandler(async (req, res) => {
//   try {
//     const { features } = req.body;

//     if (!features || typeof features !== "string" || features.trim() === "") {
//       return res.status(400).json({
//         message:
//           "Please provide features/keywords as a string in the request body",
//       });
//     }

//     // Use the features string directly in the prompt
//     const featuresString = features.trim();

//     // Create a prompt for the LLM to generate a menu item description
//     const prompt = `You are a professional food writer specializing in compelling menu descriptions.
// Create an engaging and appetizing description for a menu item with these features/keywords: ${featuresString}.
// The description should be between 25-50 words, be persuasive, highlight the unique selling points,
// and make the dish sound appealing to customers.
// Return ONLY the description text without any additional commentary or formatting.`;

//     // Call the LLM inference using fetch
//     const response = await fetch("http://localhost:11434/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "llama3.2:1b",
//         prompt: prompt,
//         stream: false,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     // Extract the generated description
//     const generatedDescription = data.response.trim();

//     // Return the generated description
//     res.status(200).json({
//       features: featuresString,
//       description: generatedDescription,
//       model: "llama3.2:1b",
//     });
//   } catch (error) {
//     console.error("Error generating menu item description:", error);
//     res.status(500).json({
//       message: "Failed to generate description",
//       error: error.message,
//     });
//   }
// });

//with replicate
const generateMenuItemDescription = asyncHandler(async (req, res) => {
  try {
    const { features } = req.body;

    if (!features || typeof features !== "string" || features.trim() === "") {
      return res.status(400).json({
        message:
          "Please provide features/keywords as a string in the request body",
      });
    }

    const featuresString = features.trim();

    const prompt = `You are a professional food writer specializing in compelling menu descriptions.
Create an engaging and appetizing description for a menu item with these features/keywords: ${featuresString}.
The description should be between 25-50 words, be persuasive, highlight the unique selling points, 
and make the dish sound appealing to customers.
Return ONLY the description text without any additional commentary or formatting.`;

    const replicateRes = await fetch(
      "https://api.replicate.com/v1/models/meta/meta-llama-3-8b-instruct/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          Prefer: "wait", // waits for completion before responding
        },
        body: JSON.stringify({
          input: {
            prompt: prompt,
            temperature: 0.7,
            max_new_tokens: 100,
          },
        }),
      }
    );

    if (!replicateRes.ok) {
      throw new Error(`Replicate API error! Status: ${replicateRes.status}`);
    }

    const replicateData = await replicateRes.json();

    const rawOutput = replicateData.output;
    const generatedDescription = Array.isArray(rawOutput)
      ? rawOutput.join("").replace(/```/g, "").trim()
      : rawOutput;

    res.status(200).json({
      features: featuresString,
      description: generatedDescription,
      model: "meta-llama-3-8b-instruct",
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
// @route   POST /api/llm/search-restaurants
// @access  Public
const searchRestaurantsWithLLM = asyncHandler(async (req, res) => {
  try {
    const { query, restaurants: providedRestaurants, requestId } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    console.log(`Processing search request for: "${query}" (ID: ${requestId})`);

    // Use provided restaurants or fetch from database
    let allRestaurants;
    if (providedRestaurants && Array.isArray(providedRestaurants)) {
      allRestaurants = providedRestaurants;
      console.log(`Using ${providedRestaurants.length} provided restaurants`);
    } else {
      // Fetch restaurants from database
      console.log("Fetching restaurants from database");
      allRestaurants = await AllRestaurantsModal.find({});
    }

    if (!allRestaurants || allRestaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    // Filter only needed fields for LLM processing
    const simplifiedRestaurants = allRestaurants.map((restaurant) => ({
      areaName: restaurant.areaName,
      avgRating: restaurant.avgRating,
      costForTwo: restaurant.costForTwo,
      cuisines: restaurant.cuisines,
      name: restaurant.name,
      veg: restaurant.veg,
    }));

    // Create a prompt for the LLM
    const prompt = `You are a restaurant search assistant. 
Based on the user's query: "${query}", find the most relevant restaurants from this list:
${JSON.stringify(simplifiedRestaurants, null, 2)}

Return ONLY a JSON object that contains an array of restaurant names that match the query, in this format:
{ "matchingRestaurants": ["Restaurant Name 1", "Restaurant Name 2"] }
Do not include any other text in your response.`;

    // Call the LLM inference using fetch (reusing existing approach)
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
    const responseText = data.response;

    // Parse the LLM response to get matching restaurant names
    let matchingNames = [];
    try {
      // Find JSON content between curly braces
      const jsonMatch = responseText.match(/\{[\\s\S]*\}/);

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
      matchingRestaurants = allRestaurants.filter((restaurant) =>
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
      const cuisineMatches = allRestaurants.filter(
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

// @desc    Search restaurants using Elasticsearch
// @route   POST /api/llm/elastic-search
// @access  Public
const searchRestaurantsWithElastic = asyncHandler(async (req, res) => {
  try {
    const { query, requestId } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    console.log(
      `Processing Elasticsearch request for: "${query}" (ID: ${requestId})`
    );

    // First check if Elasticsearch is available
    const elasticsearchAvailable = await isElasticsearchAvailable();
    if (!elasticsearchAvailable) {
      console.log(
        "Elasticsearch is not available, falling back to MongoDB search"
      );
      return await searchWithMongoDBFallback(query, res);
    }

    // Try to perform Elasticsearch search
    try {
      // Check if the restaurants index exists
      const indexExists = await elasticClient.indices.exists({
        index: "restaurants",
      });

      // If index doesn't exist, create it and index all restaurants
      if (!indexExists) {
        console.log(
          "Restaurants index does not exist, falling back to MongoDB search"
        );
        return await searchWithMongoDBFallback(query, res);
      }

      // Perform search using Elasticsearch
      const searchResult = await elasticClient.search({
        index: "restaurants",
        body: {
          query: {
            multi_match: {
              query: query,
              fields: ["name^3", "cuisines^2", "areaName"],
              fuzziness: "AUTO",
            },
          },
          size: 20,
        },
      });

      // Process search results
      const elasticResults = searchResult.hits.hits;
      console.log(`Elasticsearch found ${elasticResults.length} results`);

      // If no results from Elasticsearch, use MongoDB fallback
      if (elasticResults.length === 0) {
        return await searchWithMongoDBFallback(query, res);
      }

      // Get MongoDB IDs from Elasticsearch results
      const restaurantIds = elasticResults.map((hit) => hit._source.mongoId);

      // Fetch full restaurant data from MongoDB using the IDs
      const matchingRestaurants = await AllRestaurantsModal.find({
        _id: { $in: restaurantIds },
      });

      // Sort the results to match the order from Elasticsearch
      const sortedRestaurants = restaurantIds
        .map((id) => matchingRestaurants.find((r) => r._id.toString() === id))
        .filter(Boolean);

      // Return the results
      return res.status(200).json({
        query: query,
        results: sortedRestaurants,
        resultsCount: sortedRestaurants.length,
        searchMethod: "elasticsearch",
      });
    } catch (error) {
      console.error("Error during Elasticsearch search:", error);
      // Fallback to MongoDB search in case of any Elasticsearch errors
      return await searchWithMongoDBFallback(query, res);
    }
  } catch (error) {
    console.error("Unexpected error in search:", error);
    // Final fallback in case of any other errors
    return await searchWithMongoDBFallback(req.body?.query || "", res);
  }
});

// Helper function for MongoDB fallback search
const searchWithMongoDBFallback = async (query, res) => {
  try {
    console.log(`Performing MongoDB fallback search for: "${query}"`);

    if (!query) {
      return res.status(200).json({
        query: query,
        results: [],
        resultsCount: 0,
        searchMethod: "mongodb-fallback",
      });
    }

    const keywords = query.toLowerCase().split(" ");

    const mongoResults = await AllRestaurantsModal.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { cuisines: { $in: keywords.map((k) => new RegExp(k, "i")) } },
        { areaName: { $regex: query, $options: "i" } },
      ],
    });

    console.log(`MongoDB fallback found ${mongoResults.length} results`);

    return res.status(200).json({
      query: query,
      results: mongoResults || [],
      resultsCount: mongoResults.length,
      searchMethod: "mongodb-fallback",
    });
  } catch (error) {
    console.error("MongoDB fallback search error:", error);
    return res.status(500).json({
      message: "Failed to perform search",
      error: error.message,
      query: query,
      results: [],
      resultsCount: 0,
    });
  }
};

// @desc    Get personalized restaurant recommendations based on user history
// @route   GET /api/llm/personalized-recommendations
// @access  Public
const getPersonalizedRecommendations = asyncHandler(async (req, res) => {
  try {
    // Get user ID from query parameter
    const userId = req.query.userId;

    // Check if userId is null, undefined, or "null" string
    if (!userId || userId === "null" || userId === "undefined") {
      return res.status(200).json({
        message: "Valid user ID is required",
        recommendations: [],
        userPreferences: {
          favoriteCuisines: [],
          pricePreference: "",
          dietaryPreferences: "",
        },
      });
    }

    console.log(`Getting personalized recommendations for user: ${userId}`);

    // Get user's order history - using correct models
    let userOrders = [];
    try {
      // Get completed or accepted orders
      userOrders = await CartModal.find({
        userId: userId,
        status: { $in: ["completed", "accept"] },
      })
        .sort({ createdAt: -1 })
        .limit(10);

      console.log(`Found ${userOrders.length} orders for user ${userId}`);

      // Early return if no orders
      if (!userOrders || userOrders.length === 0) {
        return res.status(200).json({
          message: "No order history found for this user",
          recommendations: [],
          userPreferences: {
            favoriteCuisines: [],
            pricePreference: "",
            dietaryPreferences: "",
          },
        });
      }

      // Get restaurant details for each order
      const restaurantIds = userOrders.map((order) => order.restaurantId);
      const restaurantDetails = await AllRestaurantsModal.find({
        _id: { $in: restaurantIds },
      });

      console.log(`Found ${restaurantDetails.length} restaurant details`);

      // Map restaurant details to orders
      const orderHistory = userOrders.map((order) => {
        const restaurant = restaurantDetails.find(
          (r) => r._id.toString() === order.restaurantId.toString()
        );

        return {
          restaurantName: restaurant ? restaurant.name : "Unknown Restaurant",
          cuisines: restaurant ? restaurant.cuisines : [],
          orderedItems: order.items.map((item) => item.name),
          rating: order.rating || null,
          review: order.review || null,
          costForTwo: restaurant ? restaurant.costForTwo : null,
          veg: restaurant ? restaurant.veg : false,
        };
      });

      // Fetch all restaurants for recommendations
      const allRestaurants = await AllRestaurantsModal.find({});
      console.log(
        `Found ${allRestaurants.length} restaurants total for recommendations`
      );

      // Filter only necessary data for LLM
      const restaurantsForLLM = allRestaurants.map((r) => ({
        name: r.name,
        areaName: r.areaName,
        cuisines: r.cuisines,
        avgRating: r.avgRating,
        costForTwo: r.costForTwo,
        veg: r.veg,
      }));

      // Create a prompt for the LLM
      const prompt = `You are a restaurant recommendation system.
Based on this user's order history and preferences:
${JSON.stringify(orderHistory, null, 2)}

Please analyze their food preferences, favorite cuisines, price range, and highly-rated restaurants.
Then recommend 5 restaurants from this list that they might enjoy:
${JSON.stringify(restaurantsForLLM.slice(0, 100), null, 2)}

Return ONLY a JSON object with this structure:
{
  "recommendations": [
    {
      "restaurantName": "Name",
      "reason": "Brief personalized explanation why this restaurant matches their preferences"
    }
  ],
  "userPreferences": {
    "favoriteCuisines": ["Cuisine1", "Cuisine2"],
    "pricePreference": "budget/mid-range/premium",
    "dietaryPreferences": "any dietary preferences detected (veg/non-veg/etc)"
  }
}`;

      console.log("Sending request to LLM for personalization...");
      // Call the LLM inference
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
      const responseText = data.response;

      // Parse the LLM response
      let recommendationData = {};
      try {
        // Extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          recommendationData = JSON.parse(jsonMatch[0]);
          console.log("Successfully parsed LLM recommendations");
        } else {
          throw new Error("Could not parse LLM response");
        }
      } catch (parseError) {
        console.error("Error parsing LLM response:", parseError);
        recommendationData = {
          recommendations: [],
          userPreferences: {
            favoriteCuisines: [],
            pricePreference: "unknown",
            dietaryPreferences: "unknown",
          },
        };
      }

      // Return the personalized recommendations
      return res.status(200).json({
        userId: userId.toString(),
        ...recommendationData,
        ordersAnalyzed: userOrders.length,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(200).json({
        message: "Error retrieving order data",
        error: dbError.message,
        recommendations: [],
        userPreferences: {
          favoriteCuisines: [],
          pricePreference: "",
          dietaryPreferences: "",
        },
      });
    }
  } catch (error) {
    console.error("Error generating personalized recommendations:", error);
    return res.status(200).json({
      message: "Failed to generate personalized recommendations",
      error: error.message,
      recommendations: [],
      userPreferences: {
        favoriteCuisines: [],
        pricePreference: "",
        dietaryPreferences: "",
      },
    });
  }
});

//elastic searhch

export {
  processModelInference,
  generateMenuItemDescription,
  searchRestaurantsWithLLM,
  searchRestaurantsWithElastic,
  getPersonalizedRecommendations,
};
