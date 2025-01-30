// controllers/advanced/audioController.js
const AudioProcessor = require('../../services/audioProcessor');
const ElevenLabsService = require('../../services/elevenLabsService');
const BufferManager = require('../../utils/bufferManager');
const path = require('path');

const processAdvancedPodcast = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        // store the uploaded file in buffer
        const bufferId = BufferManager.storeBuffer(req.file.buffer);

        // process the audio with enhanced quality
        const processedPath = await AudioProcessor.processAudio(
            BufferManager.bufferToStream(BufferManager.getBuffer(bufferId)),
            {
                quality: 'high',
                outputFormat: 'mp3'
            }
        );

        // convert to different voices if specified
        if (req.body.useMultipleVoices) {
            const voices = await ElevenLabsService.getVoices();
            // implementation for multiple voices
        }

        res.json({
            success: true,
            processedAudio: processedPath,
            bufferId
        });

    } catch (error) {
        console.error('Error in advanced podcast processing:', error);
        res.status(500).json({ error: error.message });
    }
};

const addBackgroundMusic = async (req, res) => {
    try {
        if (!req.files['voice'] || !req.files['music']) {
            return res.status(400).json({ error: 'Both voice and music files are required' });
        }

        const voiceBuffer = BufferManager.storeBuffer(req.files['voice'][0].buffer);
        const musicBuffer = BufferManager.storeBuffer(req.files['music'][0].buffer);

        const outputPath = await AudioProcessor.addBackgroundMusic(
            BufferManager.bufferToStream(BufferManager.getBuffer(voiceBuffer)),
            BufferManager.bufferToStream(BufferManager.getBuffer(musicBuffer)),
            path.join(process.env.AUDIO_OUTPUT_DIR, `mixed_${Date.now()}.mp3`),
            req.body.musicVolume || 0.1
        );

        res.json({
            success: true,
            outputPath
        });

    } catch (error) {
        console.error('Error adding background music:', error);
        res.status(500).json({ error: error.message });
    }
};

const combineVoiceTracks = async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ error: 'At least two audio tracks are required' });
        }

        const trackBuffers = req.files.map(file => 
            BufferManager.storeBuffer(file.buffer)
        );

        const tracks = trackBuffers.map(bufferId => 
            BufferManager.bufferToStream(BufferManager.getBuffer(bufferId))
        );

        const outputPath = await AudioProcessor.combineAudioTracks(
            tracks,
            path.join(process.env.AUDIO_OUTPUT_DIR, `combined_${Date.now()}.mp3`)
        );

        res.json({
            success: true,
            outputPath
        });

    } catch (error) {
        console.error('Error combining voice tracks:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    processAdvancedPodcast,
    addBackgroundMusic,
    combineVoiceTracks
};