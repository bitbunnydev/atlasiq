import express from "express";
import {
  getAllQuiz,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  deleteQuestion,
} from "../controllers/quizController.js";
// import { protect } from "../middleware/authMiddleware.js"; // If you have auth

const router = express.Router();

// Public or Protected Routes
router.get("/", getAllQuiz);
router.get("/:id", getQuizById); // Matches 'req.params.id'

// Admin/Teacher Routes (Add 'protect' middleware here if ready)
router.post("/", createQuiz);
router.put("/:id", updateQuiz); // Matches 'req.params.id'
router.delete("/:id", deleteQuiz);

// Question Routes
// Note: Matches 'req.params.id' in addQuestion
router.post("/:id/questions", addQuestion);

// Note: Matches 'req.params.id' AND 'req.params.questionId'
router.delete("/:id/questions/:questionId", deleteQuestion);

export default router;
