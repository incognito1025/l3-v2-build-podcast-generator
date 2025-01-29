//app.js
// require/import dependencies
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // for handling file uploads
const path = require("path");
const upload = require("./middleware/uploadAudio"); // Import the upload middleware
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { generatePodcast } = require("./controllers/podcastController");
const {
  generateFromTranscript,
} = require("./controllers/transcriptController");
const { errorHandler } = require("./middleware/errorHandler");
const { invokeGeminiAPI } = require("./api/geminiAPI");

// create instance of express server app
const app = express();

// middleware for the server app
app.use(cors()); // enable CORS for cross-origin requests
app.use(express.json()); // parse incoming JSON payloads

// Test route for Gemini API
app.post("/api/test-gemini", async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: "User input is required" });
    }
    const response = await invokeGeminiAPI(userInput);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Podcast Generator");
});

// POST route for audio file processing (handles audio uploads and generation)
app.post("/api/generate-podcast", upload.single("audio"), generatePodcast); // Use the upload middleware

// POST route for transcript-based podcast generation
app.post("/api/generate-from-transcript", generateFromTranscript);

// Catch-all route for undefined routes (404 errors)
app.all("*", (req, res) => {
  res.status(404).send("This is the error page.");
});

// error handler middleware (placed last to catch errors from all routes)
app.use(errorHandler);

// Export server app for use in `server.js`
module.exports = app;
