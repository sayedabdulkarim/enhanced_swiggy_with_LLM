import asyncHandler from "express-async-handler"; //
//modals
import CartModal from "../../modals/cartModal.js";

// @desc    Get restaurant orders by restaurant ID
// @route   GET /api/admin/ordersdetails/:restaurantId
// @access  Private
const getOrdersDetailsFromRestaurantId = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  // Find all restaurant order details with the given restaurantId
  const restaurantOrdersDetails = await CartModal.find({
    restaurantId,
  });

  if (restaurantOrdersDetails.length > 0) {
    // Return the orders to the admin
    res.json({
      message: "Orders retrieved successfully",
      orders: restaurantOrdersDetails, // Changed restaurantMenu to orders for clarity
    });
  } else {
    // If no orders are found for the restaurant, send a 404 response
    res.status(404).json({
      message: "Restaurant has no orders.",
    });
  }
});

// @desc    Update order item status for a restaurant
// @route   PUT /api/admin/updateOrderStatus/:restaurantId
// @access  Private
const updateOrderItemStatus = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { orderId, itemId, newStatus, cancelledReason } = req.body;

  // console.log(
  //   {
  //     restaurantId,
  //     orderId,
  //     itemId,
  //     newStatus,
  //   },
  //   " checkck"
  // );
  // Find the specific order in the restaurant
  const order = await CartModal.findOne({
    _id: orderId,
    restaurantId: restaurantId,
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  if (newStatus === "reject" && cancelledReason) {
    order.cancelledReason = cancelledReason;
  }

  // Find the item in the order and update its status
  order.status = newStatus;
  // const item = order.items.find((item) => item._id.toString() === itemId);
  // if (item) {
  //   item.status = newStatus; // Update the status of the item
  // } else {
  //   return res.status(404).json({ message: "Item not found in order." });
  // }

  // Save the updated order
  await order.save();

  res.status(200).json({
    message: "Order item status updated successfully",
    order: order,
  });
});

// @desc    Get all order reviews and LLM analysis for a restaurant
// @route   GET /api/admin/order-reviews/:restaurantId
// @access  Private
// const getRestaurantReviewsAnalysis = asyncHandler(async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     // Find all completed orders for the restaurant with reviews
//     const orderReviews = await CartModal.find({
//       restaurantId,
//       status: { $in: ["completed", "accept"] },
//       review: { $exists: true, $ne: null },
//     }).select("review sentiment llmResponse rating createdAt");

//     if (orderReviews.length === 0) {
//       return res.status(200).json({
//         message: "No reviews found for this restaurant",
//         reviews: [],
//         analysis: "No reviews available to analyze.",
//       });
//     }

//     // Process reviews for LLM analysis
//     const reviewsData = orderReviews.map((order) => ({
//       review: order.review,
//       sentiment: order.sentiment || "neutral",
//       rating: order.rating || "not provided",
//       date: order.createdAt,
//     }));

//     // Create prompt for LLM to analyze reviews
//     const prompt = `You are a restaurant analytics expert.
// Analyze these customer reviews for a restaurant:
// ${JSON.stringify(reviewsData, null, 2)}

// Create a concise, insightful analysis in bullet point format covering:
// • Overall sentiment trend
// • Common positive feedback
// • Common negative feedback
// • Areas for improvement
// • Standout features of the restaurant
// • Any pattern in ratings over time

// Format your response with bullet points (•) for easy reading. Keep your analysis professional, actionable and under 300 words.`;

//     // Call the LLM for analysis
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
//     const analysisText = data.response;

//     // Return both the raw reviews and the analysis
//     res.status(200).json({
//       message: "Reviews retrieved successfully",
//       reviewsCount: orderReviews.length,
//       reviews: orderReviews,
//       analysis: analysisText,
//     });
//   } catch (error) {
//     console.error("Error retrieving restaurant reviews:", error);
//     res.status(500).json({
//       message: "Failed to get restaurant reviews analysis",
//       error: error.message,
//     });
//   }
// });

// @desc    Get all order reviews and LLM analysis for a restaurant using Replicate API
// @route   GET /api/admin/order-reviews2/:restaurantId
// @access  Private
const getRestaurantReviewsAnalysis = asyncHandler(async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Find all completed orders for the restaurant with reviews
    const orderReviews = await CartModal.find({
      restaurantId,
      status: { $in: ["completed", "accept"] },
      review: { $exists: true, $ne: null },
    }).select("review sentiment rating createdAt");

    if (orderReviews.length === 0) {
      return res.status(200).json({
        message: "No reviews found for this restaurant",
        reviews: [],
        analysis: "No reviews available to analyze.",
      });
    }

    // Process reviews for Replicate API analysis - only include necessary data to reduce tokens
    const reviewsData = orderReviews.map((order) => ({
      review: order.review,
      sentiment: order.sentiment || "neutral",
      rating: order.rating || "not provided",
    }));

    // Create prompt for Replicate API to analyze reviews - keep it concise
    const prompt = `You are a restaurant analytics expert.
Analyze these customer reviews for a restaurant:
${JSON.stringify(reviewsData, null, 2)}

Create a concise, insightful analysis in bullet point format covering:
• Overall sentiment trend
• Common positive and negative feedback
• Areas for improvement
• Standout features

Format your response with bullet points (•) for easy reading. Keep your analysis under 200 words.`;

    // Call the Replicate API for analysis
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
            max_new_tokens: 200, // Reduced from 300 to 200 to save on tokens
          },
        }),
      }
    );

    if (!replicateRes.ok) {
      throw new Error(`Replicate API error! Status: ${replicateRes.status}`);
    }

    const replicateData = await replicateRes.json();

    // Process the response
    const rawOutput = replicateData.output;
    const analysisText = Array.isArray(rawOutput)
      ? rawOutput.join("").trim()
      : rawOutput;

    // Return both the raw reviews and the analysis
    res.status(200).json({
      message: "Reviews retrieved successfully",
      reviewsCount: orderReviews.length,
      reviews: orderReviews,
      analysis: analysisText,
    });
  } catch (error) {
    console.error("Error retrieving restaurant reviews:", error);
    res.status(500).json({
      message: "Failed to get restaurant reviews analysis",
      error: error.message,
    });
  }
});

export {
  getOrdersDetailsFromRestaurantId,
  updateOrderItemStatus,
  getRestaurantReviewsAnalysis,
};
