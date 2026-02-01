import Quiz from "../models/Quiz.js";

//Get all quiz
export async function getAllQuiz(req, res) {
  try {
    const quizs = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json(quizs);
  } catch (error) {
    console.error("Failed in get all quiz", error);
    res.status(500).json({ message: error.message });
  }
}

// Get quiz by ID
export async function getQuizById(req, res) {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id).populate(
      "creator, firstName lastName username",
    );
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Failed in get quiz", error);
    res.status(500).json({ message: error.message });
  }
}

//Create Quiz
export async function createQuiz(req, res) {
  try {
    const {
      subject,
      title,
      description,
      category,
      grades,
      access,
      accessCode,
    } = req.body;

    const newQuiz = new Quiz({
      subject,
      title,
      description,
      category,
      grades,
      access,
      accessCode,
      creator: req.user._id,
      questions: [],
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error("Failed to create a quiz", error);
    res.status(500).json({ message: error.message });
  }
}

// Update Quiz
export async function updateQuiz(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Fetch the document first
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check Ownership
    if (req.user && quiz.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this quiz" });
    }

    // Apply updates manually
    // This loops through your body and updates the quiz fields
    const allowedUpdates = [
      "subject",
      "title",
      "description",
      "category",
      "grades",
      "access",
      "accessCode",
    ];

    allowedUpdates.forEach((field) => {
      if (updates[field] !== undefined) {
        quiz[field] = updates[field];
      }
    });

    // Save
    // If you changed access to 'invite-code', the hook runs NOW.
    const updatedQuiz = await quiz.save();

    res.status(200).json({ message: "Success Update", updatedQuiz });
  } catch (error) {
    console.error("Failed to update quiz", error);
    res.status(500).json({ message: error.message });
  }
}

// DeleteQuiz
export async function deleteQuiz(req, res) {
  try {
    const { id } = req.params;

    // Find the quiz first
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check ownership
    if (quiz.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this quiz" });
    }

    // Delete it
    await quiz.deleteOne();

    res.status(200).json({ message: "You successfully deleted the quiz" });
  } catch (error) {
    console.error("Failed to delete quiz", error);
    res.status(500).json({ message: error.message });
  }
}

//Add Question
export async function addQuestion(req, res) {
  try {
    const { id } = req.params; //get quiz Id
    const { questionText, options, correctAnswer, timeLimit } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {
        $push: {
          questions: {
            questionText,
            options,
            correctAnswer,
            timeLimit: timeLimit || 15,
          },
        },
      },
      { new: true, runValidators: true },
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Failed to add question", error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteQuestion(req, res) {
  try {
    const { id, questionId } = req.params;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {
        $pull: {
          questions: { _id: questionId },
        },
      },
      {
        new: true,
      },
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Success update question", updatedQuiz });
  } catch (error) {
    console.error("Failed to delete question", error);
    res.status(500).json({ message: error.message });
  }
}
