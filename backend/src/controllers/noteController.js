import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Failed in get all note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Failed in get note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { noteTitle, noteDesc, subject, grade, pdfFile } = req.body;
    const newNote = new Note({
      noteTitle,
      noteDesc,
      subject,
      grade,
      pdfFile,
      user: req.user.id,
    });
    const savedNote = await newNote.save();
    res.status(201).json({ message: "Note created", savedNote });
  } catch (error) {
    console.error("Failed create note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { noteTitle, noteDesc, subject, grade, pdfFile } = req.body;

    // 1. Find the note first
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 2. SECURITY CHECK: Ensure the logged-in user owns this note
    // If the note's owner ID does not match the requester's ID, stop them.
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this note" });
    }

    // 3. Perform the update safely
    // We reuse the 'note' object or call update on the model now that we verified ownership
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        noteTitle,
        noteDesc,
        subject,
        grade,
        pdfFile,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({ message: "Successful update", updatedNote });
  } catch (error) {
    console.error("Failed update note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    // 1. Find the note
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 2. SECURITY CHECK: Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this note" });
    }

    // 3. Delete
    await note.deleteOne();

    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.error("Failed delete note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
