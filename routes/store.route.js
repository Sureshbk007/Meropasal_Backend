import express from "express";
import {
  getStoreDetails,
  updateStoreDetails,
} from "../controllers/store.controller.js";

const storeRouter = express.Router();

storeRouter.route("/").get(getStoreDetails).post(updateStoreDetails);

export default storeRouter;
