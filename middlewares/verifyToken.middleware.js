import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Authentication failed: Token not provided"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new ApiError(401, "Authentication failed: Invalid token"));
  }
};

export { verifyToken };
