const express = require('express');
const { register, login } = require('../controllers/authControllers');
const router = express.Router();

const { generateQuestions } = require('../controllers/resumeController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Use in-memory for small files

router.post('/upload-resume', upload.single('resume'), generateQuestions);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
