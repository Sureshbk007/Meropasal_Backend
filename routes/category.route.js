import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(verifyToken, upload.single("categoryImg"), createCategory)
  .delete(verifyToken, deleteCategory);

export default router;
