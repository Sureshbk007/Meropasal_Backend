import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

export default router;
