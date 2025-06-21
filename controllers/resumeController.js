const pdfParse = require('pdf-parse');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const { generateResumeFeedback } = require('../services/geminiService');

const analyzeResume = async (req, res) => {
  try {
    const { role, jobDescription } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({success : false ,message: 'No file uploaded' });
    }

    let resumeText = '';

    // Step 1: Extract resume text
    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer);
      resumeText = data.text;
    } else if (file.mimetype === 'text/plain') {
      resumeText = file.buffer.toString('utf-8');
    } else {
      return res.status(400).json({success:false, message: 'Unsupported file type' });
    }

    if (!resumeText.trim()) {
      return res.status(400).json({ message: 'Empty or unreadable resume content' });
    }

    // Step 2: Get feedback from Gemini
    const { positives, negatives, suggestions } = await generateResumeFeedback(resumeText, role, jobDescription);

    // Step 3: Save to DB
    const analysis = await ResumeAnalysis.create({
      user: req.user.userId,
      role,
      jobDescription,
      resumeText,
      positives,
      negatives,
      suggestions
    });

    // Step 4: Send response
    res.status(201).json({success:true, message: 'Resume analyzed successfully', analysis });

  } catch (err) {
    console.error("Resume Analysis Error:", err.message);
    res.status(500).json({success : false, message: 'Failed to analyze resume', error: err.message });
  }
};

module.exports = {
    analyzeResume,
}
