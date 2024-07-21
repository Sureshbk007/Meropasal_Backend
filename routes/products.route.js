import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:slug").get(getSingleProduct);

export default router;
