import express from "express";
import { login, register } from "../controllers/user.controller.js";

const router = express.Router();

//Register Route
router.post("/register", register);

//Login Route
router.post("/login", login);

export default router;
