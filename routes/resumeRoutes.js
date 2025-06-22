const express = require('express');
const router = express.Router();
const { generateQuestions } = require('../controllers/resumeController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Use in-memory for small files

router.post('/upload-resume', upload.single('resume'), generateQuestions);

module.exports = router;
