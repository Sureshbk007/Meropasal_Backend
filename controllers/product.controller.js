import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  if (!product) {
    throw new ApiError(500, "Failed to create product");
  }
  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug });
  res
    .status(200)
    .json(new ApiResponse(200, product, "Product retrieved successfully"));
});
export { createProduct, getAllProducts, getSingleProduct };
