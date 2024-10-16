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
router.post("/", createUser);

// Get all the users
router.get("/", verifyToken, getAllUsers);
router.put("/", verifyToken, upload.single("avatar"), updateUser);

export default router;
