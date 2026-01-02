import mongoose from "mongoose";

const noteScheme = mongoose.Schema(
  {
    noteTitle: {
      type: String,
      required: true,
    },
    noteDesc: {
      type: String,
    },
    pdfFile: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
    },
    uploadedBy: {
      type: mongoose.Scheme.Types.ObjectId,
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
