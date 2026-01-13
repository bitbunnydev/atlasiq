import Quiz from "../models/Quiz.js";

export async function getAllQuiz(req, res) {
  try {
    const quizs = await Quiz.find().sort({ createdAt: -1 });
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

//Create Quiz
export async function createQuiz(req, res) {
  try {
    const { subject, title, description, category, grades, access, creator } =
      req.body;

    const newQuiz = new Quiz({
      subject,
      title,
      description,
      category,
      grades,
      access,
      creator,
      questions: [], //empty array
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
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

//Add Question
export async function addQuestion(req, res) {
  try {
    const { quizId } = req.params; //get quiz Id
    const { questionText, options, correctAnswer, timeLimit } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          questions: {
            questionText,
            options,
            correctAnswer,
            timeLimit,
          },
        },
      },
      { new: true, runValidator: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Failed to delete quiz");
    res.status(500).json({ message: "Internal server error" });
  }
}
