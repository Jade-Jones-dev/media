const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user.js');

router.post('/signup',  userCtrl.signup);
router.post('/login',  userCtrl.login);
router.delete('/deleteaccount/:id',  userCtrl.deleteUser);

module.exports = router;