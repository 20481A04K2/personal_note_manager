import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateNote = ({ currentNote, onFormSubmit, resetEditing }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  // Populate the form if editing an existing note
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
      setCategory(currentNote.category);
    } else {
      resetForm();
    }
  }, [currentNote]);

  // Reset the form to its default state
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Others");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = { title, description, category };

    try {
      if (currentNote) {
        // Update existing note
        await axios.put(
          `https://personal-notemanager-backend.onrender.com/notes/${currentNote._id}`,
          noteData
        );
        console.log("Note updated successfully");
      } else {
        // Create a new note
        await axios.post(
          "https://personal-notemanager-backend.onrender.com/notes",
          noteData
        );
        console.log("Note created successfully");
      }

      // Open Snackbar for success message
      setOpenSnackbar(true);

      // Notify parent component and reset the form
      if (onFormSubmit) onFormSubmit();
      resetForm();
      setTimeout(() => navigate("/"), 2000); // Navigate to homepage after 2 seconds
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate("/"); // Navigate to homepage
  };

  // Check if the form is valid (fields are not empty)
  const isFormValid = title && description && category;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // Attach the submit handler to the form
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        margin: "0 auto",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>

      {/* Cancel Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleCancel}
        sx={{ mt: 2 }}
      >
        Cancel
      </Button>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
        disabled={!isFormValid} // Disable if form is invalid
      >
        {currentNote ? "Update Note" : "Add Note"}
      </Button>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Note {currentNote ? "updated" : "added"} successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateNote;
