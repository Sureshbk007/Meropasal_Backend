import { Category } from "../models/category.mode.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const fetchHomePageData = asyncHandler(async (req, res) => {
  const categories = await Category.find().limit(10);
  const flashSaleProducts = await Product.find({ isSale: true }).limit(15);
  const latestProducts = await Product.find().limit(20).sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { categories, flashSaleProducts, latestProducts },
        "Home Page Data fetched successfully"
      )
    );
});

export { fetchHomePageData };
