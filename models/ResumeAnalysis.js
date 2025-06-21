const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role : String,
  jobDescription : String,
  resumeText: String,
  positives: String,
  negatives: String,
  suggestions: String,
},{timestamps : true});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
