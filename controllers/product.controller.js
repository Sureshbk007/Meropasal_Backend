import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    brand,
    description,
    sellingPrice,
    crossedPrice,
    purchasedPrice,
    stock,
    sizes,
    colors,
  } = req.body;

  const images = [];
  for (const file of req.files) {
    const response = await uploadOnCloudinary(file.path);
    if (!response) {
      throw new ApiError(500, "Failed to image in cloudinary");
    }
    const { public_id, url } = response;
    images.push({
      publicId: public_id,
      imageUrl: url,
    });
  }

  const productData = {
    title,
    category,
    description,
    images,
  };

  if (brand) productData.brand = brand;
  if (sellingPrice) productData.sellingPrice = Number(sellingPrice);
  if (crossedPrice) productData.crossedPrice = Number(crossedPrice);
  if (purchasedPrice) productData.purchasedPrice = Number(purchasedPrice);
  if (stock) productData.stock = Number(stock);
  if (sizes) productData.sizes = sizes;
  if (colors) productData.colors = colors;

  const product = await Product.create(productData);
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

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(400, "Product not found");
  }
  const deletedProduct = await Product.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
});

export { createProduct, getAllProducts, getSingleProduct, deleteProduct };
