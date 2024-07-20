import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getStoreDetails = asyncHandler((req, res) => {
  const store = {
    name: "MeroPasal",
    bannerImages: [
      {
        imageUrl: "",
      },
    ],
    favicon: {},
    logo: {},
  };

  res
    .status(200)
    .json(new ApiResponse(200, store, "Store Data fetched successfully"));
});

const updateStoreDetails = asyncHandler((req, res) => {
  const store = {
    name: "MeroPasal",
    bannerImages: [
      {
        imageUrl: "",
      },
    ],
    favicon: {},
    logo: {},
  };

  res
    .status(200)
    .json(new ApiResponse(200, store, "Store Data updated successfully"));
});

export { getStoreDetails, updateStoreDetails };
