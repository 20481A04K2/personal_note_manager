const express = require("express");
const Note = require("../models/Note");

const {
  handleGetAllusers,
  handlePostAuser,
  handleDeleteAuser,
  handlePutAuser,
  handleGetAusers,
} = require("../controllers/user");

const router = express.Router();

router.get("/", handleGetAllusers);
router.get("/:id", handleGetAusers);
router.post("/", handlePostAuser);
router.put("/:id", handlePutAuser);
router.delete("/:id", handleDeleteAuser);

module.exports = router;
