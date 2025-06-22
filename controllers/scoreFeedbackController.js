const axios = require("axios");

exports.getScoreFeedback = async (req, res) => {
  try {
    const { scores } = req.body;

    if (!scores || typeof scores !== "object") {
      return res.status(400).json({ error: "Invalid or missing scores object." });
    }

    const response = await axios.post(
      "https://feedback-learning-generator.onrender.com/analyze_scores/",
      { scores }
    );

    const data = response.data;
    return res.status(200).json(data);

  } catch (error) {
    console.error("❌ Score feedback error:", error.message);
    if (error.response) {
      return res.status(500).json({ error: error.response.data });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
