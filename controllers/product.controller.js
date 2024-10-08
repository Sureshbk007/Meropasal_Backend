import { Product } from "../models/product.model.js";
import { Category } from "../models/category.mode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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
  const {
    q,
    sortBy = "latest",
    category,
    minPrice,
    maxPrice,
    rating = 0,
    limit = 20,
    page = 1,
    brand,
    isSale,
  } = req.query;
  let filters = {};

  if (isSale) {
    filters.isSale = Boolean(isSale);
  }
  if (brand) {
    const brandArray = Array.isArray(brand) ? brand : [brand];
    filters.brand = {
      $in: brandArray.map((br) => new RegExp(br, "i")),
    };
  }

  if (category) {
    const categoriesArray = Array.isArray(category) ? category : [category];
    const matchingCategories = await Category.find({
      name: { $in: categoriesArray.map((cat) => new RegExp(cat, "i")) },
    });

    if (matchingCategories.length) {
      filters.category = { $in: matchingCategories.map((cat) => cat._id) };
    } else {
      return res
        .status(404)
        .json(
          new ApiResponse(404, [], "No products found for these categories")
        );
    }
  }
  if (minPrice || maxPrice) {
    filters.sellingPrice = {};
    if (minPrice) filters.sellingPrice.$gte = parseFloat(minPrice);
    if (maxPrice) filters.sellingPrice.$lte = parseFloat(maxPrice);
  }

  if (rating) {
    filters.rating = {
      $gte: parseFloat(rating),
    };
  }

  if (q) {
    const matchingCategories = await Category.find({
      name: { $regex: q, $options: "i" },
    });
    const categoryIds = matchingCategories.map((cat) => cat._id);
    filters.$or = [
      { title: { $regex: q, $options: "i" } },
      { brand: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { category: { $in: categoryIds } },
    ];
  }

  const resultsLimit = parseInt(limit);
  const pageNumber = Math.max(1, parseInt(page));
  const skip = (pageNumber - 1) * resultsLimit;

  let sortOption = {};
  if (sortBy === "latest") {
    sortOption.createdAt = -1;
  } else if (sortBy === "priceLowToHigh") {
    sortOption.sellingPrice = 1;
  } else if (sortBy === "priceHighToLow") {
    sortOption.sellingPrice = -1;
  }

  const products = await Product.find(filters)
    .limit(resultsLimit)
    .skip(skip)
    .sort(sortOption)
    .populate({
      path: "category",
      select: "name",
    });

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug }).populate({
    path: "category",
    select: "name",
  });
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
  for (let img of product.images) {
    try {
      await deleteFromCloudinary(img.publicId);
    } catch (error) {
      console.error(
        `Failed to delete image with public ID ${img.publicId}:`,
        error
      );
    }
  }
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Product not found during deletion"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
});

export { createProduct, getAllProducts, getSingleProduct, deleteProduct };
