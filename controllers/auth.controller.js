import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new user
const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.find({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  //Todo hash password

  const user = await User.create({ fullName, email, password });
  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");

  //Todo compare password
  const isMatch = true;
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  //Todo Generate JWt token
  res.status(200).json(new ApiResponse(200, user, "Login successful"));
});

export { register, login };
