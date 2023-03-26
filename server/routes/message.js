const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message.js");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


// Create a new message
router.post("/", auth, multer, messageCtrl.create);

// Retrieve all message
router.get("/", auth, messageCtrl.findAll);

// Retrieve a single message with id
router.get("/:id", auth, messageCtrl.findOne);

// Update a message with id
router.put("/:id", auth, multer, messageCtrl.update);

// Delete a message with id
router.delete("/:id", auth, messageCtrl.delete);

module.exports= router;
