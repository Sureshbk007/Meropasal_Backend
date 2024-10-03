import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.mode.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
  const categories = await Category.find().select("_id name image.imageUrl");

  const formattedCategories = categories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image.imageUrl,
  }));

  res
    .status(200)
    .json(
      new ApiResponse(200, formattedCategories, "Category fetch successfully")
    );
});

export { createCategory, getAllCategory };
