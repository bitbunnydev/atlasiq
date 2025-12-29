import express from "express";
import { getQuizs } from "../controllers/quizController.js";

const router = express.Router();

//routes
router.get("api/", getQuizs);

export default router;
