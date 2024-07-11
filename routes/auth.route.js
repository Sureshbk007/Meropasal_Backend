import express from "express";
import {
  register,
  login,
  logout,
  getUserByToken,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const authRouter = express.Router();

//Verify Token
authRouter.post("/", verifyToken, getUserByToken);

// Register route
authRouter.post("/register", register);

//Login route
authRouter.post("/login", login);

// Logout route
authRouter.post("/logout", verifyToken, logout);

export default authRouter;
