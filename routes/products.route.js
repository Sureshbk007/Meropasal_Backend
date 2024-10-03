import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(upload.array("productImg", 10), createProduct)
  .delete(deleteProduct);
router.route("/:slug").get(getSingleProduct);

export default router;
