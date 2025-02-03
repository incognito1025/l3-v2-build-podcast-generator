// controllers/advanced/audioController.js
const path = require("path");
const multer = require("multer");
const AudioProcessor = require("../../services/audioProcessor");
const ElevenLabsService = require("../../services/elevenLabsService");
const BufferManager = require("../../utils/bufferManager");

// Define the file storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Define where to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Name the file with a timestamp and original filename
  },
});

// Set the file upload limits and multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit for file size
});

// Middleware to handle file upload for a single file
const uploadAudio = (req, res, next) => {
  upload.single("audio")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next(); // Proceed to the next middleware or controller if upload is successful
  });
};

// Middleware to handle multiple files upload
const uploadMultipleAudio = (req, res, next) => {
  upload.array("audio", 10)(req, res, (err) => {
    // Accept up to 10 files for multiple uploads
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next(); // Proceed to the next middleware or controller if upload is successful
  });
};

// Process Podcast with Enhanced Quality
const processAdvancedPodcast = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    // Store the uploaded file in the buffer
    const bufferId = BufferManager.storeBuffer(req.file.buffer);

    // Process the audio with enhanced quality
    const processedPath = await AudioProcessor.processAudio(
      BufferManager.bufferToStream(BufferManager.getBuffer(bufferId)),
      {
        quality: "high",
        outputFormat: "mp3",
      }
    );

    res.json({
      success: true,
      processedAudio: processedPath,
      bufferId,
    });
  } catch (error) {
    console.error("Error in advanced podcast processing:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add Background Music to Audio
const addBackgroundMusic = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res
        .status(400)
        .json({ error: "Both voice and music files are required" });
    }

    const voiceBuffer = BufferManager.storeBuffer(req.files[0].buffer); // First file is voice
    const musicBuffer = BufferManager.storeBuffer(req.files[1].buffer); // Second file is music

    const outputPath = await AudioProcessor.addBackgroundMusic(
      BufferManager.bufferToStream(BufferManager.getBuffer(voiceBuffer)),
      BufferManager.bufferToStream(BufferManager.getBuffer(musicBuffer)),
      path.join(process.env.AUDIO_OUTPUT_DIR, `mixed_${Date.now()}.mp3`),
      req.body.musicVolume || 0.1
    );

    res.json({
      success: true,
      outputPath,
    });
  } catch (error) {
    console.error("Error adding background music:", error);
    res.status(500).json({ error: error.message });
  }
};

// Combine Multiple Audio Tracks
const combineVoiceTracks = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two audio tracks are required" });
    }

    const trackBuffers = req.files.map((file) =>
      BufferManager.storeBuffer(file.buffer)
    );
    const tracks = trackBuffers.map((bufferId) =>
      BufferManager.bufferToStream(BufferManager.getBuffer(bufferId))
    );

    const outputPath = await AudioProcessor.combineAudioTracks(
      tracks,
      path.join(process.env.AUDIO_OUTPUT_DIR, `combined_${Date.now()}.mp3`)
    );

    res.json({
      success: true,
      outputPath,
    });
  } catch (error) {
    console.error("Error combining voice tracks:", error);
    res.status(500).json({ error: error.message });
  }
};


// Compress Audio
const compressAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    // Store the uploaded file in the buffer
    const bufferId = BufferManager.storeBuffer(req.file.buffer);

    // Compress the audio file
    const compressedPath = await AudioProcessor.compressAudio(
      BufferManager.bufferToStream(BufferManager.getBuffer(bufferId)),
      {
        bitrate: req.body.bitrate || "128k", // Default bitrate
        outputFormat: "mp3",
      }
    );

    res.json({
      success: true,
      compressedAudio: compressedPath,
      bufferId,
    });
  } catch (error) {
    console.error("Error in audio compression:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processAdvancedPodcast,
  addBackgroundMusic,
  combineVoiceTracks,
  compressAudio, // Exporting the compress audio function
  uploadAudio, // Exporting the upload middleware for single file
  uploadMultipleAudio, // Exporting the upload middleware for multiple files
}

