import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  getQuizById,
  updateQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

//routes
router.get("/", getQuiz);
router.get("/:id", getQuizById);
router.get("/", createQuiz);
router.get("/:id", updateQuiz);
router.get("/:id", deleteQuiz);

export default router;
