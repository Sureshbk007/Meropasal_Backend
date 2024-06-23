import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new user
const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  //Check if user already exist
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  // Create a new user
  const user = await User.create({ fullName, email, password });
  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userWithPassword = await User.findOne({ email });
  if (!userWithPassword)
    throw new ApiError(401, "Invalid email or password", {
      email: "Incorrect email address",
    });

  //Compare passwords
  const isMatch = await userWithPassword.comparePassword(password);
  if (!isMatch)
    throw new ApiError(401, "Invalid email or password", {
      password: "Incorrect password",
    });

  // Exclude sensitive fields
  const user = await User.findOne({ email }).select(
    "-password -createdAt -updatedAt -__v"
  );

  // Generate JWt token
  const token = user.generateAuthToken();

  // Set the token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json(new ApiResponse(200, user, "Login successful"));
});

// Logout a user
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successfully", success: true });
});

export { register, login, logout };
