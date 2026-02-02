import Quiz from "../models/Quiz.js";

// Fetch all quizzes (Latest first)
export async function getAllQuiz(req, res) {
  try {
    const quizs = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json(quizs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Fetch quiz by ID with creator details
export async function getQuizById(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.id).populate(
      "creator",
      "firstName lastName username",
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Initialize a new Quiz draft
export async function createQuiz(req, res) {
  try {
    const newQuiz = new Quiz({
      ...req.body,
      creator: req.user._id,
      questions: req.body.questions || [{}], // Starts with one blank card
    });
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// THE SYNC ENGINE: Handles all live updates (Title, Reordering, Adding/Deleting Questions)
export async function syncQuiz(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Ownership Security
    if (quiz.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this quiz" });
    }

    // Sync allowed fields including the entire questions array
    const allowedFields = [
      "subject",
      "title",
      "description",
      "category",
      "grades",
      "access",
      "questions",
    ];
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        quiz[field] = updates[field];
      }
    });

    // .save() triggers the autoGenerateAccessCode hook
    const updatedQuiz = await quiz.save();
    res.status(200).json({ message: "Sync successful", updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete Quiz
export async function deleteQuiz(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (quiz.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await quiz.deleteOne();
    res.status(200).json({ message: "Quiz successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
