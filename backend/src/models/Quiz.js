import mongoose from "mongoose";

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
  },
  {
    timestamp: true,
  }
);
export default Quiz;
