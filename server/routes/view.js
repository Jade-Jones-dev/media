const express = require("express");
const router = express.Router();
const viewCtrl = require("../controllers/view.js");

router.post("/", viewCtrl.createView);
router.get('/:id', viewCtrl.findviews);
router.get('/', viewCtrl.findAllViews)

module.exports= router;