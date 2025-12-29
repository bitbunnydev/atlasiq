import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: Number,
    default: 15,
  },
});

const quizScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quizDesc: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quizAttempts: {
      type: Number,
      default: 0,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);
const Quiz = mongoose.model("Quiz", quizScheme);
export default Quiz;
