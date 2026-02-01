import mongoose from "mongoose";
import { autoGenerateAccessCode } from "../hooks/quizHooks.js";

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

const quizSchema = mongoose.Schema(
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
      enum: ["Primary", "Secondary", "Univ"],
    },
    access: {
      type: String,
      required: true,
      enum: ["Public", "Private", "Invite-code"],
    },
    accessCode: {
      type: String,
      required: function () {
        return this.access === "Invite-code";
      },
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
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

//Attach Hook
quizSchema.pre("validate", autoGenerateAccessCode);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
