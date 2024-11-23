const mongoose = require("mongoose");

// Define the schema
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: ["Work", "Personal", "Others"],
    default: "Others",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save middleware to update the `updated_at` field
NoteSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model("Note", NoteSchema);
