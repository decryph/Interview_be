const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.processVoiceAnswer = async (req, res) => {
  try {
    const { expectedText, audioFile } = req.body; // audioFile is a URL or file path

    // STEP 1: Convert voice to text
    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioFile));  // adjust based on how file is stored

    const voiceTextRes = await axios.post('https://voicescore2.onrender.com/voice-to-text', formData, {
      headers: formData.getHeaders(),
    });

    const userText = voiceTextRes.data.text;

    // STEP 2: Send expectedText and userText for scoring
    const scoreRes = await axios.post('https://voicescore2.onrender.com/evaluate', {
      expected: expectedText,
      actual: userText
    });

    res.json({
      userText,
      ...scoreRes.data  // includes domain, score, feedback
    });

  } catch (error) {
    console.error('Error in processVoiceAnswer:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
