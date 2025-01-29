//require/import dependencies
const express = require("express");
const cors = require("cors");
const multer = require("multer"); //for handling file uploads
const { generatePodcast, generateFromTranscript } = require("./controllers");

//Create instance of express server app
const app = express();

//middleware for the server app
app.use(cors());
app.use(express.json());

//Health check route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Podcast Generatort");
});

//Error route
app.get("*", (req, res) => {
  res.status(404).send("This is the error page.");
});

//POST route for audio file processing
app.post("/api/generate-podcast", multer().single("audio"), generatePodcast);

//POST route for text processing
app.post("/api/generate-from-transcript", generateFromTranscript);

//Export server app
module.exports = app;
