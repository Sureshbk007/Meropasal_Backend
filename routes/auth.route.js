import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Register route
authRouter.post("/register", register);

//Login route
authRouter.post("/login", login);

export default authRouter;
