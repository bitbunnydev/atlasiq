import mongoose from "mongoose";
import { autoGenerateAccessCode } from "../hooks/quizHooks.js";

const questionSchema = mongoose.Schema({
  questionText: { type: String, default: "Untitled Question" },
  options: { type: [String], default: ["Option 1"] },
  questionType: {
    type: String,
    enum: ["Multiple choice", "Checkboxes", "Short answer"],
    default: "Multiple choice",
  },
  correctAnswer: { type: Number, default: 0 },
  isRequired: { type: Boolean, default: false },
  timeLimit: { type: Number, default: 15 },
});

const quizSchema = mongoose.Schema(
  {
    subject: { type: String, required: true },
    title: { type: String, default: "Untitled Quiz" },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    grades: {
      type: String,
      required: true,
      enum: ["Primary", "Secondary", "Univ"],
    },
    access: {
      type: String,
      required: true,
      enum: ["Public", "Private", "Invite-code"],
      default: "Public",
    },
    accessCode: { type: String },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true },
);

quizSchema.pre("validate", autoGenerateAccessCode);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
