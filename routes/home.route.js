import express from "express";
import { fetchHomePageData } from "../controllers/home.comtroller.js";

const router = express.Router();

router.route("/").get(fetchHomePageData);

export default router;
