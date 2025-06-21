const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({success : false , message: 'Unauthorized: No token. Please Login/Sign up' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (e.g., userId) to request
    next();
  } catch (err) {
    return res.status(401).json({success : false , message: 'Unauthorized: Invalid token' });
  }
};

module.exports = requireAuth;
