//controllers/podcastController.js
const multer = require("multer"); // import multer for handling file uploads (if needed)
const fs = require("fs"); // import the filesystem module
const path = require("path"); // import the path module to handle file paths
const { invokeGeminiAPI } = require("../api/geminiAPI");

// POST request handler for podcast generation
const generatePodcast = async (req, res) => {
  const audioFile = req.file; // retrieve the uploaded audio file from the request

  // Check if the file is uploaded and valid
  if (!audioFile) {
    return res
      .status(400)
      .json({
        success: false,
        message: "No audio file uploaded or the file type is invalid.",
      });
  }

  //File type validation
  if (!audioFile || !['audio/mp3', 'audio/wav'].includes(audioFile.mimetype)) {
    return res.status(400).json({ success: false, message: "Invalid file type. Only MP3 and WAV are supported." });
}

  // Build path to the uploaded file
  const filePath = path.join(__dirname, "../uploads", audioFile.filename); // Use filename from multer

  try {
    // Use Gemini API to generate podcast content
    const aiResponse = await invokeGeminiAPI(
      `Generate a podcast script based on the following audio file: ${audioFile.originalname}`
    );

    // Respond with the AI-generated script
    res.status(200).json({
      success: true,
      scriptURL: "url_to_podcast_script", // Update this with a valid URL if applicable
      script: aiResponse,
      segments: [], // You can parse the aiResponse to create segments if needed
    });
  } catch (error) {
    // Handle errors from API invocation
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    // Clean up: delete the uploaded file after processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  }
};

module.exports = { generatePodcast };
