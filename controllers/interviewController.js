const InterviewSession = require('../models/InterviewSession');
const { generateInterviewQA, generateFeedback } = require('../services/geminiService');

const generateSession = async (req, res) => {
  const { role, skills, difficulty, numQuestions } = req.body;
  const userId = req.user.userId;

  try {
    const questions = await generateInterviewQA(role, skills, difficulty , Number(numQuestions));

    const session = await InterviewSession.create({
      user: userId,
      role,
      skills,
      difficulty,
      questions,
    });

    res.status(201).json({success : true, message: 'Session created', sessionId : session._id, session });
  } catch (err) {
    res.status(500).json({success : false, message: 'Failed to generate session', error: err.message });
  }
};

const getUserSessions = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.status(201).json({ success : true, sessions });
  } catch (err) {
    console.error("Failed to fetch sessions:", err.message);
    res.status(500).json({success : false, message: "Failed to load sessions" });
  }
};

const getSessionById = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({success:false, message: 'Session not found' });
    }

    // Optional: check if session.user == req.user.id

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({success:false ,message: 'Failed to fetch session' });
  }
};

const submitAnswer = async (req, res) => {
  const { sessionId, questionIndex } = req.params;
  const { userAnswer } = req.body;

  try {
    const session = await InterviewSession.findById(sessionId);
    if (!session || session.user.toString() !== req.user.userId) {
      return res.status(404).json({success : false , message: 'Session not found or unauthorized' });
    }

    const qa = session.questions[parseInt(questionIndex)];
    if (!qa) return res.status(400).json({success : false, message: 'Invalid question index' });

    qa.userAnswer = userAnswer;
    session.questions[parseInt(questionIndex)].userAnswer = userAnswer;
    // Ask Gemini for feedback
    const feedback = await generateFeedback(qa.question, qa.modelAnswer, userAnswer);
    qa.feedback = feedback;
    session.questions[parseInt(questionIndex)].feedback = feedback;

    await session.save();

    res.status(201).json({success : true, message: 'Answer submitted and feedback generated', question: qa, feedback });
  } catch (err) {
    console.error("Submit answer error:", err.message);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check ownership
    if (session.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this session' });
    }

    await session.deleteOne();

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (err) {
    console.error('Delete session error:', err.message);
    res.status(500).json({ message: 'Failed to delete session' });
  }
};



module.exports = {
    generateSession,
    getUserSessions,
    getSessionById,
    submitAnswer,
    deleteSession,
}
