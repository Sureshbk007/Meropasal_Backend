import express from "express";
import {
  authRouter,
  userRouter,
  productRouter,
  storeRouter,
} from "./routes/index.js";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(cors());

// Auth Route
app.use("/api/v1/auth", authRouter);

//Secure Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/store", storeRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json(new ApiError(statusCode, message, err.errors));
});

// Route for Handling 404 Errors
app.use((_, res) => {
  const error = new ApiError(404, "Page Not Found");
  res.status(404).json(error);
});

export { app };
