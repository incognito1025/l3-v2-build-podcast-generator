// services/elevenLabsService.js
//Handles API calls to ElevenLabs, business logic
// services/elevenLabsService.js
// services/elevenLabsService.js
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.baseUrl = "https://api.elevenlabs.io/v1";
    this.outputDir = path.join(__dirname, "../generated");
  }

  async ensureOutputDirectory() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      console.log("Output directory ensured: ", this.outputDir);
    } catch (error) {
      console.error("Error ensuring output directory:", error);
    }
  }

  async textToSpeech(text, voiceId) {
    await this.ensureOutputDirectory(); // Ensure directory exists before attempting to save a file

    try {
      const response = await axios({
        method: "POST",
        url: `${this.baseUrl}/text-to-speech/${voiceId}`,
        headers: {
          Accept: "audio/mpeg",
          "xi-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        data: {
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        },
        responseType: "arraybuffer",
      });

      const outputPath = path.join(this.outputDir, `tts_${Date.now()}.mp3`);
      await fs.writeFile(outputPath, response.data);
      return outputPath;
    } catch (error) {
      console.error("Error in text-to-speech conversion:", error);
      throw error;
    }
  }

  async getVoices() {
    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: {
          "xi-api-key": this.apiKey,
        },
      });
      console.log("Raw Voices API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching voices:", error);
      throw error;
    }
  }

  async getVoiceSettings(voiceId) {
    try {
      const response = await axios.get(`${this.baseUrl}/voices/${voiceId}/settings`, {
        headers: {
          "xi-api-key": this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching voice settings:", error);
      throw error;
    }
  }
}

module.exports = new ElevenLabsService();

// require('dotenv').config();
// const { ElevenLabsClient } = require('elevenlabs');

// const elevenLabsClient = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

// const generateSpeech = async (text) => {
//     try {
//         const response = await elevenLabsClient.textToSpeech({
//             text,
//             voice: 'Rachel' // Choose a voice
//         });
//         return response.audio; // Returns audio file
//     } catch (error) {
//         console.error("ElevenLabs Error:", error);
//         throw new Error("Failed to generate speech.");
//     }
// };

// module.exports = { generateSpeech };


/* 

old code
// services/elevenLabsService.js
//Handles API calls to ElevenLabs, business logic
// services/elevenLabsService.js
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.baseUrl = "https://api.elevenlabs.io/v1";
    this.outputDir = path.join(__dirname, "../generated");
  }

  async init() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error("Error creating output directory:", error);
    }
  }

  

  async textToSpeech(text, voiceId = "DEFAULT_VOICE_ID") {
    try {
      const response = await axios({
        method: "POST",
        url: `${this.baseUrl}/text-to-speech/${voiceId}`,
        headers: {
          Accept: "audio/mpeg",
          "xi-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        data: {
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        },
        responseType: "arraybuffer",
      });

      const outputPath = path.join(this.outputDir, `tts_${Date.now()}.mp3`);
      await fs.writeFile(outputPath, response.data);
      return outputPath;
    } catch (error) {
      console.error("Error in text-to-speech conversion:", error);
      throw error;
    }
  }

  async getVoices() {
    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: {
          "xi-api-key": this.apiKey,
        },
      });
      console.log("Raw Voices API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching voices:", error);
      throw error;
    }
  }
}

module.exports = new ElevenLabsService();

// require('dotenv').config();
// const { ElevenLabsClient } = require('elevenlabs');

// const elevenLabsClient = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

// const generateSpeech = async (text) => {
//     try {
//         const response = await elevenLabsClient.textToSpeech({
//             text,
//             voice: 'Rachel' // Choose a voice
//         });
//         return response.audio; // Returns audio file
//     } catch (error) {
//         console.error("ElevenLabs Error:", error);
//         throw new Error("Failed to generate speech.");
//     }
// };

// module.exports = { generateSpeech };




*/