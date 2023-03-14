const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.js");

router.post("/", commentCtrl.createcomment);
router.get("/", commentCtrl.findcomments);

module.exports= router;