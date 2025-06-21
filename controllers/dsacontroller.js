const axios = require("axios");
const questions = require("../dsa/dsaQuestions.json");

exports.generateQuestion = (req, res) => {
  const { role, difficulty } = req.body;

  const filtered = questions.filter(
    (q) => q.role === role && q.difficulty === difficulty
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No question found." });
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  res.json({ question: random.question });
};

exports.submitCode = async (req, res) => {
  const { code, language, question } = req.body;

  const langMap = {
    cpp: 54,
    python: 71,
    java: 62,
  };

  try {
    const execRes = await axios.post(
      process.env.JUDGE0_API,
      {
        language_id: langMap[language],
        source_code: code,
        stdin: "",
      },
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const output = execRes.data.stdout || execRes.data.stderr || "No output";

    // Since OpenAI isn't used, just return dummy feedback
    const feedback = "AI feedback not available (OpenAI disabled).";

    res.json({ output, feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
