import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Create a user
router.post("/createUser", createUser);

// Get all the users
router.post("/getAllUsers", verifyToken, getAllUsers);
router.put("/update", verifyToken, upload.single("avatar"), updateUser);

export default router;
