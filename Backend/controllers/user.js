const Note = require("../models/Note");

async function handleGetAllusers(req, res) {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) filter.title = new RegExp(search, "i"); // Case-insensitive search
    if (category) filter.category = category;

    const notes = await Note.find(filter).sort({ created_at: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handlePostAuser(req, res) {
  try {
    const { title, description, category } = req.body;

    const newNote = new Note({
      title,
      description,
      category,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handlePutAuser(req, res) {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleDeleteAuser(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleGetAusers(req, res) {
  const { id } = req.params; // Get the note ID from the URL parameters

  try {
    // Find the note by ID in the database
    const note = await Note.findById(id);

    // If the note does not exist, return a 404 error
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Return the note in the response
    res.status(200).json(note);
  } catch (err) {
    // If there was an error, return a 500 error with the error message
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
module.exports = {
  handleGetAllusers,
  handlePostAuser,
  handlePutAuser,
  handleDeleteAuser,
  handleGetAusers,
};
