import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoteList = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "https://personal-notemanager-backend.onrender.com/notes"
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://personal-notemanager-backend.onrender.com/notes/${id}`
      );
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Format date and time
  const formatDateTime = (isoString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(isoString)
    );
  };

  // Filter notes based on title and category
  const filteredNotes = notes.filter((note) => {
    const titleMatch = note.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category ? note.category === category : true;
    return titleMatch && categoryMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Notes Dashboard
          </h1>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/create")}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Note
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-6 mb-6">
          <TextField
            label="Search by Title"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            className="w-1/3"
          />

          <FormControl variant="outlined" className="w-1/3">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              className="bg-white"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Table */}
        <TableContainer
          component={Paper}
          className="shadow-md rounded-lg bg-white"
        >
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-semibold text-gray-700">
                  Title
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Description
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Category
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Created At
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Updated At
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow key={note._id} className="hover:bg-gray-50">
                  <TableCell>{note.title}</TableCell>
                  <TableCell>{note.description}</TableCell>
                  <TableCell>{note.category}</TableCell>
                  <TableCell>{formatDateTime(note.created_at)}</TableCell>
                  <TableCell>{formatDateTime(note.updated_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/update/${note._id}`)}
                        className="text-blue-600 hover:bg-blue-100"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => deleteNote(note._id)}
                        className="text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default NoteList;
