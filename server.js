const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const InterviewRoutes = require('./routes/InterviewRoutes');
app.use('/api/InterviewRoutes', InterviewRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 5900, () => {
    console.log(`Server is running on port ${process.env.PORT || 5900}`);
  });

}).catch(err => console.log(err));

app.get('/api/ping', (req, res) => {
  res.send('Pong!');
});
