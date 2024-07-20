import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  authValidator,
  loginSchema,
  registrationSchema,
} from "../utils/authValidator.js";

// Register a new user
const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const errors = await authValidator(registrationSchema, req.body);
  if (errors) throw new ApiError(401, "Validation error", errors);

  //Check if user already exist
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ApiError(400, "Validation error", {
      email: "Email already exist",
    });

  const createdUser = await User.create({ fullName, email, password });
  const user = await User.findOne({ email: createdUser.email }).select(
    "-password -createdAt -updatedAt -__v"
  );

  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = await authValidator(loginSchema, req.body);
  if (errors) throw new ApiError(401, "All fields are required", errors);

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
  let user = await User.findOne({ email }).select(
    "-password -createdAt -updatedAt -__v"
  );

  // Generate JWt token
  const token = user.generateAuthToken();

  res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "Login successful"));
});

export { register, login };
