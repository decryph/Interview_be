const axios = require('axios');

exports.generateQuestions = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    // Convert buffer to base64 or send directly based on model API
  const resumeBase64 = file.buffer.toString("base64");
    // Call the external model API
    const response = await axios.post('https://llmquestion.onrender.com/', {
      resume: resumeBase64, // adapt this based on what your model expects
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating questions:', error.message);
    return res.status(500).json({ message: 'Failed to generate questions',error: error.message });
  }
};
