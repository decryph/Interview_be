const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
"http://localhost:5900",
"https://mock-ai.vercel.app"
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const geminiRoutes = require("./routes/geminiFeedbackRoutes");
app.use("/api/gemini", geminiRoutes);

const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

const voiceRoutes = require("./routes/voiceRoutes");
app.use("/api/voice", voiceRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const InterviewRoutes = require('./routes/InterviewRoutes');
app.use('/api/interview', InterviewRoutes);

const dsaRoutes = require('./routes/dsaRoutes');
app.use('/api/dsa', dsaRoutes);

// Health check
app.get("/", (req, res) => {
res.send("MockAI backend is running");
});

app.get('/api/ping', (req, res) => {
res.send('Pong!');
});

// DB connection + server start
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
console.log('Connected to MongoDB');
app.listen(process.env.PORT || 5900, () => {
console.log( `Server is running on port ${process.env.PORT || 5900}`);
});
}).catch(err => console.log(err));
