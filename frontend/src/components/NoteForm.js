import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const navigate = useNavigate();
  const { id } = useParams(); // Get the note ID from the URL params

  // Fetch existing data when the component is mounted
  useEffect(() => {
    axios
      .get(`https://personal-notemanager-backend.onrender.com/notes/${id}`)
      .then((res) => {
        setTitle(res.data.title); // Populate title from response
        setDescription(res.data.description); // Populate description
        setCategory(res.data.category); // Populate category
      })
      .catch((err) => {
        console.error("Error fetching note data", err);
        alert("Failed to fetch note data.");
      });
  }, [id]); // Runs whenever the ID changes

  // Handle form submission to update the note
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedNote = {
      title,
      description,
      category,
    };

    axios
      .put(
        `https://personal-notemanager-backend.onrender.com/notes/${id}`,
        updatedNote
      )
      .then((res) => {
        // Show the success message (Snackbar)
        setOpenSnackbar(true);

        // Redirect to home after showing the success message
        setTimeout(() => {
          navigate("/"); // Redirect to homepage after 2 seconds
        }, 2000); // Timeout of 2 seconds for the Snackbar to disappear
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.error); // Display the error from the backend
        } else {
          alert("An error occurred while updating the note.");
        }
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Note
      </Typography>

      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{
          p: 3,
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title Input */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Description Input */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Category Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            required
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            disabled={!title || !description || !category} // Disable if form is invalid
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Note updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NoteForm;
