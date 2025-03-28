import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
//helpers
import generateToken from "../utils/generateToken.js";

// @desc authenticated users/ token
// route POST /api/users/auth
// @ccess PUBLIC
const userLogin = asyncHandler(async (req, res) => {
  const { phone } = req.body; // Expecting phone from the client

  // Find user by phone number
  const user = await UserModal.findOne({ phone });

  if (user) {
    // If user is found, generate a token (Assuming you're still using token-based authentication)
    generateToken(res, user._id);

    // Respond with user details
    res.status(200).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone,
        favorites: user.favorites, // Add this line to include the favorites in the response
      },
      message: "Login successful",
    });
  } else {
    // If user is not found, send an error response
    res.status(404).json({ message: "User not found" });
  }
});

// @desc register a new user
// route POST /api/users
// @ccess PUBLIC
const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // Check if the user already exists based on phone
  const existingUser = await UserModal.findOne({ phone });
  if (existingUser) {
    res.status(400).json({
      message: "User with this phone number already exists.Please Login.",
    });
    return;
  }

  // Check if the user already exists based on email
  const existingUserByEmail = await UserModal.findOne({ email });
  if (existingUserByEmail) {
    res
      .status(400)
      .json({ message: "User with this email already exists.Please Login." });
    return;
  }

  // Create a new user
  const newUser = new UserModal({
    name,
    email,
    phone,
  });

  await newUser.save();
  // Generate token or handle OTP logic here (if applicable)
  generateToken(res, newUser._id);

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      name,
      email,
      phone,
    },
    // Other user data can go here
  });
});

// @desc logout
// route POST /api/users/logout
// @ccess PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the cookie immediately
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Successfully logged out.",
  });
});

// @desc get user profile
// route GET /api/users/profile
// @ccess PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user._id is populated with the user's ID by auth middlewar or protected route
  console.log(req.user, " reeee");

  const user = await UserModal.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // any other fields you want to include
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user profile
// route PUT /api/users/profile
// @ccess PRIVATE
// const updateUserProfile = asyncHandler(async (req, res) => {
//   // Assuming req.user._id is populated with the user's ID by some middleware
//   const user = await UserModal.findById(req.user._id);

//   console.log(req.body, " bbbb");
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     // Assuming that you want to allow updating the password
//     if (req.body.password) {
//       user.password = req.body.password;
//       // If your User model has a pre-save hook for hashing passwords,
//       // the new password will get hashed before saving.
//     }

//     const updatedUser = await user.save();

//     res.json({
//       id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       // other fields as needed
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

const updateUserProfile = asyncHandler(async (req, res) => {
  // Assuming req.user._id is populated with the user's ID by some middleware
  const user = await UserModal.findById(req.user._id);

  // Check if the new email already exists in the database for another user
  const existingEmailUser = await UserModal.findOne({ email: req.body.email });
  if (
    existingEmailUser &&
    String(existingEmailUser._id) !== String(req.user._id)
  ) {
    res.status(400);
    throw new Error("Email already in use.");
    return;
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Assuming that you want to allow updating the password
    if (req.body.password) {
      user.password = req.body.password;
      // If your User model has a pre-save hook for hashing passwords,
      // the new password will get hashed before saving.
    }

    try {
      const updatedUser = await user.save();
      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        // other fields as needed
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400);
        throw new Error("Email already exists");
      }
      // ... (other error handling)
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { userLogin, userSignUp, logoutUser, getUserProfile, updateUserProfile };
