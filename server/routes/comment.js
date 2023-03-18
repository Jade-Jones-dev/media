const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.js");

router.post("/", commentCtrl.createcomment);
router.get("/", commentCtrl.findcomments);
router.get("/:id", commentCtrl.findOnecomment);
router.delete('/:id', commentCtrl.deleteComment);
router.put('/:id', commentCtrl.updateComment)

module.exports= router;