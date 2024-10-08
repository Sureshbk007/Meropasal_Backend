import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllOrders);
router.get("/my-orders", verifyToken, getUserOrders);
router.post("/create", verifyToken, createOrder);

export default router;
