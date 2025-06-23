const express = require("express");
const router = express.Router();

const voiceController = require("../controllers/voiceController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/process", upload.single("audio"), voiceController.processVoiceAnswer);

module.exports = router;
