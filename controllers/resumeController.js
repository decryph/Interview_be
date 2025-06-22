const axios = require('axios');

exports.generateQuestions = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    // Convert buffer to base64 or send directly based on model API
    const resumeBuffer = file.buffer;
    const base64Resume = resumeBuffer.toString('base64');

    // Call the external model API
    const response = await axios.post('https://llmquestion.onrender.com/', {
      resume: base64Resume, // adapt this based on what your model expects
    });

    const questions = response.data;

    res.status(200).json({ questions });

  } catch (error) {
    console.error('Error generating questions:', error.message);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
};
