import express from "express";
import { gethomePageData } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", gethomePageData);

export default router;
