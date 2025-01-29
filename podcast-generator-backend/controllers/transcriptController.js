//controllers/transcriptController.js
const multer = require("multer"); // Import multer for handling file upload (if needed)
const fs = require("fs"); // Import the filesystem module
const path = require("path"); // Import the path module to handle file paths
const { invokeGeminiAPI } = require("../api/geminiAPI");


// POST request handler for generating a transcript
const generateFromTranscript = async (req, res) => {
    const audioFile = req.file; // Retrieve the uploaded audio file from the request

    if (!audioFile) {
        return res.status(400).json({ success: false, message: "No file uploaded." }); // Return error if no file is uploaded
    }

    // Build path to the uploaded file
    const filePath = path.join(__dirname, "../uploads", audioFile.filename);

  try {
    const aiResponse = await invokeGeminiAPI(
      `Generate a transcript based on the following content: ${audioFile.originalname}`
    );

    res.status(200).json({
      success: true,
      transcript: aiResponse,
    });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateFromTranscript };