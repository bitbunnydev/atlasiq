import express from "express";
import {
  addQuestion,
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

//routes
router.get("/", getAllQuiz);
router.get("/:id", getQuizById);
router.post("/", createQuiz);
router.post("/:quizId/add-question", addQuestion);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
