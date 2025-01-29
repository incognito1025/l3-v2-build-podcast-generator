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

// Test route for Gemini API //Postman responded with {"error":"User input is required"}; curl also worked
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
app.post("/api/generate-podcast", upload.single("audio"), (req, res) => {
    console.log("Uploaded file details:", req.file); // Log the file object
    if (!req.file) {
        console.log("No file uploaded or invalid file type.");
        return res.status(400).json({
            success: false,
            message: "No file uploaded or invalid file type.",
        });
    }

  // If valid file is present, call the generatePodcast function
  try {
    generatePodcast(req, res);
} catch (error) {
    console.error("Error in /api/generate-podcast:", error); // Log the error
    return res.status(500).json({ error: "Something went wrong!" });
}
});

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


/*
http://localhost:3030/api/test-gemini

{
    "userInput": "Hello, this is a test message"
}
Response:
{
    "success": true,
    "response": "**Hello there!**\n\nThank you for reaching out to us. We're here to help you with your test message.\n\n**Here's what you can do:**\n\n* **Edit your message:** You can change the content of your message by clicking on the text field.\n* **Add attachments:** You can add attachments to your message by clicking on the paperclip icon.\n* **Send your message:** Once you're happy with your message, click on the send button.\n\n**Here are some tips for writing a great test message:**\n\n* Keep it short and to the point.\n* Be clear and concise.\n* Use proper grammar and spelling.\n\n**We're here to help!**\n\nIf you have any further questions, please don't hesitate to contact us. We're here to help you get the most out of your test message.\n\n**Thanks,**\n\nThe Test Message Team"
}


curl http://localhost:3030/
Welcome to the Podcast Generator% 

curl -X POST \
  -F "audio=@/path/to/your/audiofile.mp3" \

  Postman = passed
  http://localhost:3030/api/generate-podcast
  {
    "success": false,
    "message": "Gemini API call failed"
}


bash - success
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"transcript":"This is a sample transcript that needs to be processed"}' \
  http://localhost:3030/api/generate-from-transcript

Postman - success
Input
{
    "transcript": "This is a sample transcript that needs to be processed"
}


bash - success
curl http://localhost:3030/nonexistent-route


postman- success
curl http://localhost:3030/nonexistent-route
"This is teh error page."
*/