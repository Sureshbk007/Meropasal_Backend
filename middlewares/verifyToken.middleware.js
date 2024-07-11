import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyToken = asyncHandler((req, _, next) => {
  const token =
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1] ||
    req.headers.Authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Authentication failed: Token not provided");
  }
  const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
  if (!decodedToken) {
    throw new ApiError(401, "Authentication failed: Invalid token");
  }
  req.user = decodedToken;
  next();
});

export { verifyToken };
