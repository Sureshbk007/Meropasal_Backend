import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllOrders);
router.post("/create", verifyToken, createOrder);

export default router;
