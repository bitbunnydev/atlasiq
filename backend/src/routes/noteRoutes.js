import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

//Fetch
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
//Create
router.post("/", createNote);
//Update
router.put("/:id", updateNote);
//Delete
router.delete("/:id", deleteNote);

export default router;
