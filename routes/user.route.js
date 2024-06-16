import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// Create a user
router.post("/createUser", createUser);

// Get all the users
router.post("/getAllUsers", getAllUsers);

export default router;
