import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  updateQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

//routes
router.get("/", getQuiz);
router.get("/", createQuiz);
router.get("/:id", updateQuiz);
router.get("/:id", deleteQuiz);

export default router;
