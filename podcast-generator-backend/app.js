//app.js
//require/import dependencies
const express = require("express");
const cors = require("cors");
const multer = require("multer"); //for handling file uploads
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { generatePodcast } = require("./controllers/podcastController");
const { generateFromTranscript } = require("./controllers/transcriptController");
const { errorHandler } = require("./middleware/errorHandler");

//Create instance of express server app
const app = express();

//middleware for the server app
app.use(cors());
app.use(express.json());

//Health check route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Podcast Generator");
});

//POST route for audio file processing
app.post("/api/generate-podcast", multer().single("audio"), generatePodcast);

//POST route for text processing
app.post("/api/generate-from-transcript", generateFromTranscript);

//Error route
app.get("*", (req, res) => {
  res.status(404).send("This is the error page.");
});

//error handler middleware
app.use(errorHandler);

//Export server app
module.exports = app;
