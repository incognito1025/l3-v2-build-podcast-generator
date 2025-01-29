//controllers/podcastController.js
const multer = require("multer"); // import multer for handling file uploads (if needed)
const fs = require("fs"); // import the filesystem module
const path = require("path"); // import the path module to handle file paths
const { invokeGeminiAPI } = require("../api/geminiAPI");

// POST request handler for podcast generation
const generatePodcast = async (req, res) => {
  const audioFile = req.file; // retrieve the uploaded audio file from the request

  if (!audioFile) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded." }); // return error if no file is uploaded
  }

  // build path to the uploaded file
  const filePath = path.join(__dirname, "../uploads", audioFile.filename);

  try {
    // Use Gemini API to generate podcast content
    const aiResponse = await invokeGeminiAPI(
      `Generate a podcast script based on the following content: ${audioFile.originalname}`
    );

    res.status(200).json({
      success: true,
      scriptURL: "url_to_podcast_script",
      script: aiResponse,
      segments: [], // You can parse the aiResponse to create segments if needed
    });
    // clean up the uploaded file after processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generatePodcast };
