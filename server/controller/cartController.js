import asyncHandler from "express-async-handler";
import CartModal from "../modals/cartModal.js";

// @desc Add order for a user
// @route POST /api/users/addOrder
// @access PRIVATE
const addOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Extract order details from request body
  const { restaurantId, addressDetails, items, finalCost } = req.body;

  // Validate the request body
  if (
    !restaurantId ||
    !addressDetails ||
    !finalCost ||
    !items ||
    items.length === 0
  ) {
    res.status(400);
    throw new Error("Missing order details");
  }

  // Create a new order
  const newOrder = new CartModal({
    userId: userId,
    restaurantId: restaurantId,
    addressDetails: addressDetails,
    items: items,
    finalCost,
    status: "active", // or any other initial status
  });

  // Save the new order to the database
  const savedOrder = await newOrder.save();

  res.status(201).json({ savedOrder, message: "Added successfully." });
});

// @desc Submit rating and review for an order
// @route POST /api/carts/submitReview/:orderId
// @access PRIVATE
// const submitReview = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const orderId = req.params.orderId;
//   const { rating, review } = req.body;

//   // Check if at least one of rating or review is provided
//   if (!rating && !review) {
//     res.status(400);
//     throw new Error("Please provide either a rating or a review");
//   }

//   // Find the order
//   const order = await CartModal.findById(orderId);

//   // Check if order exists
//   if (!order) {
//     res.status(404);
//     throw new Error("Order not found");
//   }

//   // Verify the order belongs to the user
//   if (order.userId.toString() !== userId.toString()) {
//     res.status(403);
//     throw new Error("Not authorized to review this order");
//   }

//   // Check if order is completed (only completed orders can be reviewed)
//   if (order.status !== "accept") {
//     res.status(400);
//     throw new Error("Only completed orders can be reviewed");
//   }

//   // Update the order with the rating and/or review
//   const updateData = {};
//   if (rating) updateData.rating = rating;
//   if (review) updateData.review = review;

//   // Generate LLM response and sentiment analysis
//   let llmResponse = "";
//   let sentiment = "neutral";

//   try {
//     // Create a prompt for the LLM
//     const prompt = `
//     You are a restaurant customer service AI.
//     A customer has given the following ${rating ? `rating (${rating}/5)` : ""}
//     ${review ? `and review: "${review}"` : ""}

//     1. Analyze if this review is positive, negative, or neutral.
//     2. Generate a brief, personalized response thanking them for positive feedback or apologizing for any issues if negative.

//     Respond with JSON in this exact format:
//     {
//       "sentiment": "positive|negative|neutral",
//       "response": "Your personalized response message here"
//     }
//     `;

//     // Call the LLM service
//     const llmResult = await fetch("http://localhost:11434/api/generate", {
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

//     if (!llmResult.ok) {
//       throw new Error(`LLM service error: ${llmResult.status}`);
//     }

//     const data = await llmResult.json();

//     // Parse the JSON response from the LLM
//     try {
//       const parsedResponse = JSON.parse(data.response);
//       sentiment = parsedResponse.sentiment;
//       llmResponse = parsedResponse.response;

//       // Add sentiment to the update data
//       updateData.sentiment = sentiment;
//       // Add LLM response to the update data
//       updateData.llmResponse = llmResponse;
//     } catch (parseError) {
//       console.error("Error parsing LLM response:", parseError);
//       // Fallback response
//       sentiment = rating && rating > 3 ? "positive" : "neutral";
//       llmResponse = "Thank you for your feedback!";
//       updateData.sentiment = sentiment;
//       updateData.llmResponse = llmResponse;
//     }
//   } catch (llmError) {
//     console.error("Error calling LLM service:", llmError);
//     // Fallback response if LLM call fails
//     sentiment = rating && rating > 3 ? "positive" : "neutral";
//     llmResponse = "Thank you for your feedback!";
//     updateData.sentiment = sentiment;
//     updateData.llmResponse = llmResponse;
//   }

//   // Set the updated time
//   updateData.updatedAt = Date.now();

//   const updatedOrder = await CartModal.findByIdAndUpdate(orderId, updateData, {
//     new: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: llmResponse,
//     sentiment: sentiment,
//     order: updatedOrder,
//   });
// });

// @desc Submit rating and review for an order using Replicate API
// @route POST /api/carts/submitReview2/:orderId
// @access PRIVATE
const submitReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;
  const { rating, review } = req.body;

  // Check if at least one of rating or review is provided
  if (!rating && !review) {
    res.status(400);
    throw new Error("Please provide either a rating or a review");
  }

  // Find the order
  const order = await CartModal.findById(orderId);

  // Check if order exists
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Verify the order belongs to the user
  if (order.userId.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to review this order");
  }

  // Check if order is completed (only completed orders can be reviewed)
  if (order.status !== "accept") {
    res.status(400);
    throw new Error("Only completed orders can be reviewed");
  }

  // Update the order with the rating and/or review
  const updateData = {};
  if (rating) updateData.rating = rating;
  if (review) updateData.review = review;

  // Generate LLM response and sentiment analysis using Replicate API
  let llmResponse = "";
  let sentiment = "neutral";

  try {
    // Create a prompt for the Replicate API
    const prompt = `
    You are a restaurant customer service AI. 
    A customer has given the following ${rating ? `rating (${rating}/5)` : ""} 
    ${review ? `and review: "${review}"` : ""}
    
    1. Analyze if this review is positive, negative, or neutral.
    2. Generate a brief, personalized response thanking them for positive feedback or apologizing for any issues if negative.
    
    Respond with JSON in this exact format:
    {
      "sentiment": "positive|negative|neutral",
      "response": "Your personalized response message here"
    }
    `;

    // Call the Replicate API
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
            max_new_tokens: 100, // Keeping token count low for simple response
          },
        }),
      }
    );

    console.log("Replicate API response hello:", replicateRes);

    if (!replicateRes.ok) {
      throw new Error(`Replicate API error! Status: ${replicateRes.status}`);
    }

    const replicateData = await replicateRes.json();
    const rawOutput = replicateData.output;
    const responseText = Array.isArray(rawOutput)
      ? rawOutput.join("").trim()
      : rawOutput;

    // Parse the JSON response from the LLM
    try {
      // More robust parsing approach
      let parsedResponse;

      // First try direct JSON parsing if the entire response is JSON
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (initialParseError) {
        // If that fails, try to extract JSON using regex with a more flexible pattern
        const jsonRegex = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
        const matches = responseText.match(jsonRegex);

        if (matches && matches.length > 0) {
          try {
            parsedResponse = JSON.parse(matches[0]);
          } catch (nestedError) {
            throw new Error("Failed to parse extracted JSON");
          }
        } else {
          // If no JSON pattern is found, try to extract sentiment and response directly
          const sentimentMatch = responseText.match(
            /sentiment["\s:]+([a-z]+)/i
          );
          const responseMatch = responseText.match(/response["\s:]+([^}]+)/i);

          if (sentimentMatch || responseMatch) {
            parsedResponse = {
              sentiment: sentimentMatch
                ? sentimentMatch[1].toLowerCase()
                : "neutral",
              response: responseMatch
                ? responseMatch[1].replace(/["']/g, "").trim()
                : "Thank you for your feedback!",
            };
          } else {
            throw new Error("Could not extract data from response");
          }
        }
      }

      // Validate the parsed response has the expected fields
      if (
        parsedResponse &&
        (parsedResponse.sentiment || parsedResponse.response)
      ) {
        sentiment = parsedResponse.sentiment || "neutral";
        llmResponse = parsedResponse.response || "Thank you for your feedback!";

        // Normalize sentiment value
        if (!["positive", "negative", "neutral"].includes(sentiment)) {
          sentiment = rating && rating > 3 ? "positive" : "neutral";
        }

        // Add sentiment to the update data
        updateData.sentiment = sentiment;
        // Add LLM response to the update data
        updateData.llmResponse = llmResponse;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (parseError) {
      console.error("Error parsing Replicate response:", parseError);
      // Fallback response
      sentiment = rating && rating > 3 ? "positive" : "neutral";
      llmResponse = "Thank you for your feedback!";
      updateData.sentiment = sentiment;
      updateData.llmResponse = llmResponse;
    }
  } catch (llmError) {
    console.error("Error calling Replicate service:", llmError);
    // Fallback response if Replicate call fails
    sentiment = rating && rating > 3 ? "positive" : "neutral";
    llmResponse = "Thank you for your feedback!";
    updateData.sentiment = sentiment;
    updateData.llmResponse = llmResponse;
  }

  // Set the updated time
  updateData.updatedAt = Date.now();

  const updatedOrder = await CartModal.findByIdAndUpdate(orderId, updateData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: llmResponse,
    sentiment: sentiment,
    order: updatedOrder,
  });
});

export { addOrder, submitReview };
