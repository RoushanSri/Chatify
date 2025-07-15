import express from "express";
import {
  fetchRequest,
  fetchRequestCount,
  sendRequest,
} from "../controllers/request.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/sendRequest", isAuthenticated, sendRequest);
router.get("/fetchRequest", isAuthenticated, fetchRequest);
router.get("/fetchRequestCount", isAuthenticated, fetchRequestCount)

export default router;
