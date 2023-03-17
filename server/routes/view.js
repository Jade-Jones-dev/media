const express = require("express");
const router = express.Router();
const viewCtrl = require("../controllers/view.js");

router.post("/", viewCtrl.create);
router.get('/', viewCtrl.findviews);

module.exports= router;