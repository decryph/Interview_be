const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.processVoiceAnswer = async (req, res) => {
  try {
    const { question, audioFilePath } = req.body; // audioFile is a URL or file path
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

const voiceTextRes = await axios.post("https://voicescore2.onrender.com/voice-to-text/", formData, {
  headers: formData.getHeaders(),
});
const userAnswer = voiceTextRes.data.text;

// 3. Send expected + actual to get score & feedback
const scoreRes = await axios.post("https://voicescore2.onrender.com/compare/", {
  question,
  expected_answer: expectedAnswer,
  user_answer: userAnswer,
});

const compareRes = await axios.post('https://voicescore2.onrender.com/compare/', {
  question: 'What is overfitting in machine learning?',
  expected_answer: expectedAnswer,
  user_answer: userText
});


res.json({
  question,
  expected: expectedAnswer,
  actual: userAnswer,
  feedback: scoreRes.data.feedback,
  domain_scores: scoreRes.data.domain_scores,
});

    } catch (error) {
console.error("Voice processing error:", error.message);
res.status(500).json({ error: "Something went wrong during voice evaluation." });
}
};
  
