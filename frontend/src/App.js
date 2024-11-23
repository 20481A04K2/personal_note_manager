import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/NoteList";
// import CreateUser from "./components/CreateNote";
import UpdateUser from "./components/NoteForm";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import NoteForm from "./components/NoteForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/update/:id" element={<NoteForm />} />
      </Routes>
    </Router>
  );
};

export default App;
