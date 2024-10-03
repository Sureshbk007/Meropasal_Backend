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
  .post(upload.single("categoryImg"), createCategory)
  .get(getAllCategory);

export default router;
