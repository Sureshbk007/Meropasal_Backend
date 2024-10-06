import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(upload.single("categoryImg"), createCategory);

export default router;
