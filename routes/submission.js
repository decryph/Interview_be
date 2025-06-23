const express = require('express');
const router = express.Router();
const { submitCode, getHistory } = require('../controllers/dsaController');
const auth = require('../middleware/auth');
router.post('/', auth, submitCode);
router.get('/', auth, getHistory); // returns logged-in user's submissions

module.exports = router;
