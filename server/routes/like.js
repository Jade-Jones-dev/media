const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.js");

router.post("/", likeCtrl.create);

module.exports= router;