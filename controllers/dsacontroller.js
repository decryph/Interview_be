const axios = require("axios");
const questions = require("../dsa/dsaquestions.json");

exports.generateQuestion = (req, res) => {
  const { role, difficulty } = req.body;

  const filtered = questions.filter(
    (q) => q.role === role && q.difficulty === difficulty
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No question found." });
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  res.json({ question: random.question }); // ✅ Corrected here
};

exports.submitCode = async (req, res) => {
  const { code, language, question } = req.body;

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

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a coding interviewer. Analyze the code and output for correctness.",
        },
        
         const prompt = {
  content: `Problem: ${question}\n\nCode:\n${code}\n\nOutput:\n${output}\n\nIs this correct? Suggest improvements if needed.`
};

      ],
    });

    const feedback = aiRes.choices[0].message.content;

    res.json({ output, feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
