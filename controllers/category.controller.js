import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.mode.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const createCategory = asyncHandler(async (req, res) => {
  const response = await uploadOnCloudinary(req.file.path);
  if (!response) {
    throw new ApiError(500, "Failed to upload image in cloudinary");
  }
  const { public_id, url } = response;
  const category = await Category.create({
    name: req.body.name,
    image: {
      publicId: public_id,
      imageUrl: url,
    },
  });
  if (!category) {
    throw new ApiError(500, "Failed to create category");
  }
  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

const getAllCategory = asyncHandler(async (req, res) => {
  const { limit } = req.query;
  const categories = await Category.find().limit(limit).sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Category fetch successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(400, "Category not found");
  }
  const data = await deleteFromCloudinary(category.image.publicId);
  if (!data) {
    throw new ApiError(500, "Failed to delete category from cloudinary");
  }
  res
    .status(200)
    .json(new ApiResponse(200, category, "Category deleted successfully"));
});
export { createCategory, getAllCategory, deleteCategory };
