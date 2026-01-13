import mongoose, { Mongoose } from "mongoose";

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
    type: Number,
    required: true,
  },
  timeLimit: {
    type: Number,
    default: 15,
  },
});

const quizScheme = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    grades: {
      type: String,
      required: true,
    },
    access: {
      type: String,
      required: true,
      enum: ["public", "private", "invite-only"],
    },
    creator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
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
