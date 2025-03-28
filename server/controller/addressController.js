import asyncHandler from "express-async-handler";
// Models
import AddressModal from "../modals/addressModal.js";

// @desc Add a new address for a user
// @route POST /api/users/addAddress
// @access PRIVATE
const addAddress = asyncHandler(async (req, res) => {
  const { address, doorNumber, landmark, location, type } = req.body;

  // Check for required fields
  if (!address || !location || !location.coordinates) {
    res.status(400);
    throw new Error(
      "Missing required fields: address or location coordinates."
    );
  }

  // Ensure that the location type is 'Point'
  if (location.type !== "Point") {
    res.status(400);
    throw new Error('Invalid location type. Must be "Point".');
  }

  // Check if coordinates array has two values: longitude and latitude
  if (location.coordinates.length !== 2) {
    res.status(400);
    throw new Error(
      "Location coordinates should consist of [longitude, latitude]."
    );
  }

  // Create a new address document
  const newAddress = new AddressModal({
    user: req.user._id, // Get the user id from the request object
    address,
    doorNumber,
    landmark,
    location,
    type,
  });

  // Save the new address document to the database
  const savedAddress = await newAddress.save();

  res.status(201).json({
    message: "Address added successfully",
    address: savedAddress,
  });
});

// @desc Get addresses for a user
// @route GET /api/users/getAddressesByUser
// @access PRIVATE
const getAddressesByUser = asyncHandler(async (req, res) => {
  // Assuming user's ID is stored in req.user._id
  const userId = req.user._id;

  // Find all addresses associated with the user
  const addresses = await AddressModal.find({ user: userId });

  // console.log({
  //   userId,
  //   addresses,
  // });
  res.status(200).json({
    message: "Addresses retrieved successfully",
    addresses,
  });
});

export { addAddress, getAddressesByUser };
