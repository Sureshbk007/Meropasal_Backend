import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";
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

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(400, "Category not found");
  }

  let publicId, imageUrl;

  if (req.file?.path) {
    const response = await uploadOnCloudinary(req.file.path);
    if (!response) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }
    ({ public_id: publicId, url: imageUrl } = response);
    const data = await deleteFromCloudinary(category.image.publicId);
    if (!data) {
      throw new ApiError(500, "Failed to delete category from cloudinary");
    }
  }

  const updateFields = { name };
  if (publicId && imageUrl) {
    updateFields.image = { publicId, imageUrl };
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, updateFields, {
    new: true,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

export { createCategory, getAllCategory, deleteCategory, updateCategory };
