const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

exports.processVoiceAnswer = async (req, res) => {
try {
const { question, audioFilePath } = req.body;

  // 1. Get expected answer from voicescore2
const expectedRes = await axios.post("https://voicescore2.onrender.com/expected-answer/", {
  question,
});
const expectedAnswer = expectedRes.data.expected_answer;

// 2. Send audio file to voicescore2 for transcription
const formData = new FormData();
formData.append("audio", fs.createReadStream(audioFilePath));

const transcriptRes = await axios.post("https://voicescore2.onrender.com/voice-to-text/", formData, {
  headers: formData.getHeaders(),
});
const userText = transcriptRes.data.text;

// 3. Send expected + actual to get score & feedback
const compareRes = await axios.post("https://voicescore2.onrender.com/compare/", {
  question,
  expected_answer: expectedAnswer,
  user_answer: userText,
});

// 4. Return final combined response
res.json({
  question,
  expected: expectedAnswer,
  actual: userText,
  feedback: compareRes.data.feedback,
  domain_scores: compareRes.data.domain_scores,
});

  } catch (error) {
console.error("Voice processing error:", error.message);
res.status(500).json({ error: "Something went wrong during voice evaluation." });
}
};
