const axios = require("axios");
const FormData = require("form-data");

exports.generateQuestionsFromResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const form = new FormData();
    form.append("resume", file.buffer, file.originalname);

    const response = await axios.post("https://llmquestion.onrender.com", form, {
      headers: form.getHeaders(),
    });

    const data = response.data;

    if (data.questions && Array.isArray(data.questions)) {
      return res.json({ questions: data.questions });
    } else {
      return res.status(500).json({ error: "No questions returned from model." });
    }
  } catch (error) {
    console.error("Model API error:", error.message);
    return res.status(500).json({ error: "Failed to generate questions" });
  }
};
