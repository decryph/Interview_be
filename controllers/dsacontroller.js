exports.submitCode = async (req, res) => {
  const { code, language, question, role, difficulty } = req.body;

  const langMap = {
    cpp: 54,
    python: 71,
    java: 62,
    javascript: 63,
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
    const feedback = "AI feedback not available (OpenAI disabled).";

    await submission.create({
      userId: req.user.id, // ✅ capture logged-in user ID
      question,
      code,
      language,
      output,
      feedback,
      role,
      difficulty,
    });

    res.json({ output, feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Submission.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
