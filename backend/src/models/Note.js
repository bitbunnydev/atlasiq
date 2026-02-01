import mongoose from "mongoose";

const noteScheme = mongoose.Schema(
  {
    noteTitle: {
      type: String,
      required: true,
      trim: true,
    },
    noteDesc: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      enum: ["Primary", "Secondary", "Univ"],
    },
    pdfFile: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteScheme);
export default Note;
