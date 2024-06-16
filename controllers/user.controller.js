import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Register Controller
const register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.json(new ApiResponse(200, user, "User register successfully"));
});

// Login Controller
const login = asyncHandler(async (req, res) => {
  res.send("hello from login");
});

export { register, login };
