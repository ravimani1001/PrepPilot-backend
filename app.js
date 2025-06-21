
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes')
const resumeRoutes = require('./routes/resumeRoutes');
const requireAuth = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://prep-pilot-chi.vercel.app/',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/test-auth', requireAuth, (req, res) => {
  res.json({ userId : req.user.userId , message: `Welcome ${req.user.userId}` });
});


app.use('/api/auth', authRoutes);

app.use('/api/interview', interviewRoutes);

app.use('/api/resume', resumeRoutes);



module.exports = app;
