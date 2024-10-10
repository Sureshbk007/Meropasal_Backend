import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(verifyToken, upload.array("productImg", 10), createProduct)
  .delete(verifyToken, deleteProduct)
  .put(verifyToken, upload.array("productImg", 10), updateProduct);

router.route("/:slug").get(getSingleProduct);

export default router;
