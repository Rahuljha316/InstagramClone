const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/auth');




router.post('/signUp', signUp);

//router.get();

module.exports = router;
