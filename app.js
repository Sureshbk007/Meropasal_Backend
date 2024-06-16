import express from "express";
import { userRouter } from "./routes/index.js";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(cors());

// Routes
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Hello Suresh",
  });
});

// Global Error handling middleware
app.use((err, req, res, next) => {
  const error = err;
  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Internal Server Error";
  res.status(500).json(new ApiError(error.statusCode, error.message, error));
});

// Route for handling 404 error
app.use((_, res) => {
  const error = new ApiError(404, "Page not Found");
  res.status(404).json(error);
});

export { app };
