//middleware/uploadsAudio.js

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads'); // Assuming this file is in uploads directory

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // You might want to generate a unique name
  },
});

// Create the multer upload middleware
const upload = multer({ storage });

module.exports = upload; // Export the upload middleware