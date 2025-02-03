// routes/advanced/audioRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  processAdvancedPodcast,
  addBackgroundMusic,
  combineVoiceTracks,
} = require("../../controllers/advanced/audioController");
const audioConfig = require("../../config/audio-config");

// configure multer for audio uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: audioConfig.storage.maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    if (audioConfig.storage.allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// route for processing advanced podcast with multiple voices
router.post("/process", upload.single("audio"), processAdvancedPodcast);

// route for adding background music
router.post(
  "/add-background",
  upload.fields([
    { name: "voice", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  addBackgroundMusic
);

// route for combining multiple voice tracks
router.post("/combine-tracks", upload.array("tracks", 5), combineVoiceTracks);

// route for getting processing status
router.get("/status/:jobId", (req, res) => {
  // implementation for checking job status
  res.json({ status: "pending" });
});

module.exports = router;
