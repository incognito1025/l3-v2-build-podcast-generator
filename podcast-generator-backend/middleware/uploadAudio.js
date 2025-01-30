//middleware/uploadsAudio.js

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // Import UUID for unique filename generation

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads"); // Assuming this file is in uploads directory

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname); // Generate unique name with UUID
    cb(null, uniqueName); // Callback with unique name
  },
});

// Create the multer upload middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit, you can adjust as needed
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp3|wav|ogg/; // Allowed file types
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only audio files are allowed!"), false); // Reject file
    }
  },
});

module.exports = upload; // Export the upload middleware
