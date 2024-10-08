import express from "express";
import { esewaFailure, esewaSuccess } from "../controllers/esewa.controller.js";
import { esewaCheckIntegrity } from "../middlewares/esewa.middleware.js";

const router = express.Router();

router.get("/success", esewaCheckIntegrity, esewaSuccess);
router.get("/failure", esewaFailure);

export default router;
