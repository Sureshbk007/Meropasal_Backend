import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

//Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(401, "User not found");
  if (fullName) {
    user.fullName = fullName;
  }
  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    if (!response)
      throw new ApiError(500, "Failed to upload image in cloudinary");
    const { public_id, url } = response;
    user.avatar = {
      publicId: public_id,
      imageUrl: url,
    };
  }
  const newUser = await user.save();
  res
    .status(201)
    .json(new ApiResponse(201, newUser, "User updated successfully"));
});

export { createUser, getAllUsers, updateUser };
