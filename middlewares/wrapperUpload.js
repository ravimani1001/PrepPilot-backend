const upload = require("./upload");
const multer = require("multer");

const uploadMiddleware = (req, res, next) => {
  upload.single("resume")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors (e.g., file size too large)
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      // File filter or other errors
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = uploadMiddleware;
