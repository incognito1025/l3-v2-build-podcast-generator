// controllers/elevenLabsController.js
//Calls ElevenLab's service and processes requests
// controllers/elevenLabsController.js
// controllers/elevenLabsController.js
const ElevenLabsService = require("../services/elevenLabsService");
const BufferManager = require("../utils/bufferManager");

class ElevenLabsController {
  async convertTextToSpeech(req, res) {
    try {
      const { text, voiceId } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const voicesResponse = await ElevenLabsService.getVoices();
      const voices = voicesResponse.voices || voicesResponse; 

      if (
        !voiceId ||
        !voices ||
        !Array.isArray(voices) ||
        !voices.some((v) => v.voice_id === voiceId)
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid voice ID." });
      }

      const audioFilePath = await ElevenLabsService.textToSpeech(text, voiceId);
      const bufferId = BufferManager.storeBuffer(audioFilePath);

      res.json({
        success: true,
        bufferId,
        message: "Text converted to speech successfully",
      });
    } catch (error) {
      console.error("Text to speech error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAvailableVoices(req, res) {
    try {
      const voicesResponse = await ElevenLabsService.getVoices();
      console.log("Voices response:", voicesResponse);

      const voices = voicesResponse.voices || voicesResponse;
      console.log("Extracted voices:", voices);

      if (!Array.isArray(voices)) {
        throw new Error("Unexpected response format. Expected an array of voices.");
      }

      res.json({ success: true, voices });
    } catch (error) {
      console.error("Get voices error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getVoiceSettings(req, res) {
    try {
      const { voiceId } = req.params;
      const settings = await ElevenLabsService.getVoiceSettings(voiceId);
      res.json({ success: true, settings });
    } catch (error) {
      console.error("Get voice settings error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ElevenLabsController();

/*
// controllers/elevenLabsController.js
const { generateSpeech } = require('../services/elevenLabsService');

const generateVoice = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const audio = await generateSpeech(text);
        res.json({ success: true, audio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateVoice };

*/



/*
old code
// controllers/elevenLabsController.js
//Calls ElevenLab's service and processes requests
const ElevenLabsService = require("../services/elevenLabsService");
const BufferManager = require("../utils/bufferManager");

class ElevenLabsController {
  async convertTextToSpeech(req, res) {
    try {
      const { text, voiceId } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const voicesResponse = await ElevenLabsService.getVoices(); // Assuming this returns the structure you provided
      const voices = voicesResponse.voices || voicesResponse; // Access the nested 'voices' array, adjust handle based on voices structure

      // Check if the voiceId exists in the voices array
      if (
        !voiceId ||
        !voices ||
        !Array.isArray(voices) ||
        !voices.some((v) => v.voice_id === voiceId)
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid voice ID." });
      }

      const audioBuffer = await ElevenLabsService.textToSpeech(text, voiceId);
      const bufferId = BufferManager.storeBuffer(audioBuffer);

      res.json({
        success: true,
        bufferId,
        message: "Text converted to speech successfully",
      });
    } catch (error) {
      console.error("Text to speech error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAvailableVoices(req, res) {
    try {
      const voicesResponse = await ElevenLabsService.getVoices();
      console.log("Voices response:", voicesResponse); // Log the entire response

      //adjusted to handle potential structures of voices Response
      const voices = voicesResponse.voices || voicesResponse;
      console.log("Extracted voices:", voices);

      if (!Array.isArray(voices)) {
        throw new Error(
          "Unexpected response format. Expected an array of voices."
        );
      }

      res.json({ success: true, voices });
    } catch (error) {
      console.error("Get voices error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getVoiceSettings(req, res) {
    try {
      const { voiceId } = req.params;
      const settings = await ElevenLabsService.getVoiceSettings(voiceId);
      res.json({ success: true, settings });
    } catch (error) {
      console.error("Get voice settings error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ElevenLabsController();

/*
// controllers/elevenLabsController.js
const { generateSpeech } = require('../services/elevenLabsService');

const generateVoice = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const audio = await generateSpeech(text);
        res.json({ success: true, audio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateVoice };

*/



