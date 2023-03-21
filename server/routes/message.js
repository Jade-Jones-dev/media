const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message.js");
const auth = require('../middleware/auth');

// Create a new message
router.post("/", auth, messageCtrl.create);

// Retrieve all message
router.get("/", messageCtrl.findAll);

// Retrieve a single message with id
router.get("/:id", messageCtrl.findOne);

// Update a message with id
router.put("/:id", auth, messageCtrl.update);

// Delete a message with id
router.delete("/:id", auth, messageCtrl.delete);

module.exports= router;
