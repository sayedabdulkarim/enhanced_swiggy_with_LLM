import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
//modals
import AllRestaurantsModal from "../../modals/home/allRestaurants.js";
import AdminUserModal from "../../modals/admin/adminSingupModal.js";
//helpers
import { generateAdminToken } from "../../utils/generateToken.js";

// @desc authenticated admin/ token
// route POST /api/admin/login
// @ccess PUBLIC
const adminUserLogin = asyncHandler(async (req, res) => {
  const { email_number, password } = req.body; // email_number can be either email or phone

  // Check if the email_number is an email or a phone number
  const isEmail = email_number.includes("@");
  const isPhoneNumber = !isNaN(email_number) && email_number.length <= 10;

  // Normalize the phone number by adding '+91' if it's a phone number
  const normalizedPhone = isPhoneNumber ? `+91${email_number}` : email_number;

  // Find user by email or phone number
  //   const user = await AdminUserModal.findOne({
  //     $or: [{ email: email_number }, { phone: email_number }],
  //   });

  const user = await AdminUserModal.findOne({
    $or: [
      { email: isEmail ? email_number : null },
      { phone: isPhoneNumber ? normalizedPhone : null },
    ],
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Find the restaurant associated with this user
    const restaurant = await AllRestaurantsModal.findOne({
      adminUserId: user._id,
    });

    // If user is found and password matches, generate a token
    generateAdminToken(res, user._id);

    // Respond with user details
    res.status(200).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        restaurant: restaurant || null, // Include restaurant details or null if not found
        // Include other user details you want to return
      },
      message: "Login successful",
    });
  } else {
    // If user is not found or password does not match, send an error response
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// @desc register a new user
// route POST api/admin/signup
// @ccess PUBLIC
const adminUserSignUp = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if the user already exists based on phone
  const existingUser = await AdminUserModal.findOne({ phone });
  if (existingUser) {
    res.status(400).json({
      message: "User with this phone number already exists. Please Login.",
    });
    return;
  }

  // Check if the user already exists based on email
  const existingEmailUser = await AdminUserModal.findOne({ email });
  if (existingEmailUser) {
    res.status(400).json({
      message: "User with this email already exists. Please Login.",
    });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10); // 10 rounds is a good balance of security and performance
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user with the hashed password
  const newUser = new AdminUserModal({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  // Save the new user
  const savedUser = await newUser.save();

  // Generate token or handle OTP logic here (if applicable)
  generateAdminToken(res, savedUser._id);

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      restaurant: null,
    },
  });
});

// @desc logout
// route POST /api/admin/logout
// @ccess PUBLIC
const adminLogoutUser = asyncHandler(async (req, res) => {
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

export { adminUserLogin, adminUserSignUp, adminLogoutUser };
