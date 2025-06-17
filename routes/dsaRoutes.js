const express = require("express");
const router = express.Router();
const { generateQuestion, submitCode } = require("../controllers/dsaController");

router.post("/generate-question", generateQuestion);
router.post("/submit-code", submitCode);

module.exports = router;
