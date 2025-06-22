// controllers/resumeController.js
const axios = require('axios');
const FormData = require('form-data');

exports.generateQuestionsFromResume = async (req, res) => {
  try {
    const { jobDescription, numQuestions } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    const form = new FormData();
    form.append('resume', file.buffer, file.originalname);
    form.append('jobDescription', jobDescription || '');
    form.append('numQuestions', numQuestions || '5');

    const response = await axios.post('https://llmquestion.onrender.com', form, {
      headers: form.getHeaders(),
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating questions:', error.message);
    return res.status(500).json({
      message: 'Failed to generate questions',
      error: error.message,
    });
  }
};
