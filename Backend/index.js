const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = require("./config.js");
const bodyParser = require("body-parser");
// const Note = require("./models/Note.js");
const PORT = process.env.PORT || 8000;
const userRouter = require("./routers/user.js");
const Note = require("./models/Note");
const cors = require("cors");

app.use(cors());

// Connect to the database
connectDB();
console.log(process.env.MONGODB_URL);


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const router = express.Router();
app.use("/notes", userRouter);

// Mount the router

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
