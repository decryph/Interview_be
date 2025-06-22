const express = require("express");
const router = express.Router();

const { getScoreFeedback } = require("../controllers/scoreFeedbackController");

router.post("/get-score-feedback", getScoreFeedback);

module.exports = router;
