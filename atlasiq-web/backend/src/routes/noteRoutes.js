import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/noteController";

const router = express.Router();

//router
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.get("/", createNote);
router.get("/:id", updateNote);
router.get("/:id", deleteNote);

export default router;
