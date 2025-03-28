import asyncHandler from "express-async-handler"; //
//modals
import RestaurantDetailsModal from "../../modals/home/singleRestaurant.js";

// @desc    Get restaurant menu by restaurant ID
// @route   GET /api/admin/menu/:restaurantId
// @access  Private
const getRestaurantMenu = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  // Find the restaurant details with the given restaurantId
  const restaurantMenuDetails = await RestaurantDetailsModal.findOne({
    restaurantId,
  });

  if (restaurantMenuDetails) {
    // Return the menu to the client
    res.json({
      message: "Menu retrieved successfully",
      restaurantMenu: restaurantMenuDetails,
    });
  } else {
    // If the restaurant details are not found, send a 404 response
    res.status(404).json({
      message: "Restaurant menu not found",
    });
  }
});

// @desc    Add a new category to a restaurant
// @route   POST /api/admin/menucategory/:restaurantId/category
// @access  Private
const addCategoryToRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { categoryName } = req.body;

  // Check if restaurant details already exist for the given restaurantId
  let restaurantDetails = await RestaurantDetailsModal.findOne({
    restaurantId,
  });

  // If restaurant details don't exist, create a new document
  if (!restaurantDetails) {
    restaurantDetails = new RestaurantDetailsModal({
      restaurantId,
      menu: [{ categoryName, items: [] }], // Create new category with an empty items array
    });
  } else {
    // If restaurant details do exist, check if the category already exists
    const existingCategory = restaurantDetails.menu.find(
      (category) => category.categoryName === categoryName
    );

    // If the category doesn't exist, add the new category
    if (!existingCategory) {
      restaurantDetails.menu.push({ categoryName, items: [] });
    } else {
      // If the category already exists, send back an error message
      return res.status(400).json({
        message: "Category already exists",
      });
    }
  }

  // Save changes to the database
  await restaurantDetails.save();

  res.status(201).json({
    message: "Category added successfully",
    menu: restaurantDetails.menu,
  });
});

// @desc    Add a new item to a category
// @route   POST /api/menu/:restaurantId/category/:categoryId/item
// @access  Private
const addItemToCategory = asyncHandler(async (req, res) => {
  const { restaurantId, categoryId } = req.params;
  const { name, description, price, imageId, inStock } = req.body;

  //   console.log(
  //     {
  //       restaurantId,
  //       categoryId,
  //       req: req.body,
  //     },
  //     " from ad item"
  //   );

  // Assume restaurantId is the _id of the RestaurantDetailsModal document
  const restaurant = await RestaurantDetailsModal.findById(restaurantId);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  // Find the category by its _id within the menu array
  const category = restaurant.menu.id(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Check for existing item name within the category
  if (category.items.some((item) => item.name === name)) {
    return res
      .status(400)
      .json({ message: "Item with this name already exists" });
  }

  // Create new item and add to category items array
  const newItem = {
    name,
    description,
    imageId,
    inStock,
    price,
  };
  category.items.push(newItem);

  // Save changes to the database
  await restaurant.save();
  res.status(201).json({
    message: "Item added successfully",
    item: newItem, // newItem will have _id automatically assigned by Mongoose
  });
});

// @desc    Update item stock status
// @route   PUT /api/admin/updatestock/:restaurantId/:itemId
// @access  Private
const updateItemStock = asyncHandler(async (req, res) => {
  const { restaurantId, itemId } = req.params;
  const { inStock } = req.body; // Assuming you're sending { inStock: true/false }

  // Find the restaurant with the given restaurantId and update the item directly
  const result = await RestaurantDetailsModal.findOneAndUpdate(
    { restaurantId, "menu.items._id": itemId },
    { $set: { "menu.$[].items.$[item].inStock": inStock } },
    {
      new: true,
      arrayFilters: [{ "item._id": itemId }],
    }
  );

  if (result) {
    res.json({
      message: "Item stock status updated successfully",
      restaurantMenu: result,
    });
  } else {
    res.status(404).json({
      message: "Item not found or Restaurant not found",
    });
  }
});

// @desc    Bulk update item stock status
// @route   PUT /api/admin/bulkupdatestock/:restaurantId
// @access  Private
const bulkUpdateItemStock = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { itemIds, inStock } = req.body; // Now expecting an array of item IDs

  // Find the restaurant and update multiple items within it
  const result = await RestaurantDetailsModal.updateMany(
    { restaurantId, "menu.items._id": { $in: itemIds } },
    { $set: { "menu.$[].items.$[item].inStock": inStock } },
    {
      new: true,
      arrayFilters: [{ "item._id": { $in: itemIds } }],
    }
  );

  console.log(
    {
      restaurantId,
      itemIds,
      inStock,
      result,
    },
    " bulkkkk"
  );

  if (result.modifiedCount > 0) {
    res.json({
      message: "Item stock statuses updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } else {
    res.status(404).json({
      message: "No items updated, check if the restaurant or items exist",
    });
  }
});

export {
  addCategoryToRestaurant,
  addItemToCategory,
  getRestaurantMenu,
  updateItemStock,
  bulkUpdateItemStock,
};
