import Quiz from "../models/Quiz.js";

export async function getAllQuiz(req, res) {
  try {
    const quizs = await Quiz.find().sort({ createAt: -1 });
    res.status(200).json(quizs);
  } catch (error) {
    console.error("Failed in get all quiz", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getQuizById(req, res) {
  try {
    const { id } = req.params;
  } catch (error) {
    console.error("Failed in get quiz");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createQuiz(req, res) {
  try {
  } catch (error) {
    console.error("Failed to create a quiz");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateQuiz(req, res) {
  try {
  } catch (error) {
    console.error("Failed to update quiz");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteQuiz(req, res) {
  try {
  } catch (error) {
    console.error("Failed to delete quiz");
    res.status(500).json({ message: "Internal server error" });
  }
}
