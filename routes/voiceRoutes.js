const express = require("express");
const router = express.Router();
const voiceController = require("../controllers/voiceController");

// Main entry to process voice (fetch expected, transcribe voice, compare)
router.post("/process", voiceController.processVoiceAnswer);

module.exports = router;
