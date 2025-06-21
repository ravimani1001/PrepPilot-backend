
const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
  question: String,
  modelAnswer: String,
  userAnswer: String,
  feedback: String,
});

const interviewSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  skills: [String],
  difficulty: String,
  questions: [qaSchema]
}, {timestamps : true});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
