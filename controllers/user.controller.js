import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  if (!user) {
    throw new ApiError(500, "Failed to create user");
  }
  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users retrieved successfully"));
});

export { createUser, getAllUsers };
