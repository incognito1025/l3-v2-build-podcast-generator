// routes/elevenLabsRoutes.js
const express = require('express');
const router = express.Router();
const ElevenLabsController = require('../controllers/elevenLabsController');


// Home route for ElevenLabs
router.get('/', (req, res) => {
    res.send("Welcome to the ElevenLabs API. Available routes: /text-to-speech, /voices, /voices/:voiceId/settings");
  });

// Convert text to speech
router.post('/text-to-speech', ElevenLabsController.convertTextToSpeech);

// Get available voices
router.get('/voices', ElevenLabsController.getAvailableVoices);

// Get voice settings
router.get('/voices/:voiceId/settings', ElevenLabsController.getVoiceSettings);

module.exports = router;














// routes/elevenLabsRoutes.js
//Defines API endpoints for ElevenLabs features
/*
const express = require('express');
const { generateVoice } = require('../controllers/elevenLabsController');

const router = express.Router();

router.post('/generate', generateVoice);

module.exports = router;

*/

