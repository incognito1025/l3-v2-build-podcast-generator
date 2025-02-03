// services/audioProcessor.js
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const path = require("path");
const fs = require("fs").promises;

ffmpeg.setFfmpegPath(ffmpegStatic);

class AudioProcessor {
  constructor() {
    this.outputDir = path.join(__dirname, "../processed");
  }

  async init() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error("Error creating output directory:", error);
    }
  }

  // Existing method to process audio with options
  async processAudio(inputPath, options = {}) {
    const {
      addBackgroundMusic = false,
      musicPath = null,
      musicVolume = 0.1,
      outputFormat = "mp3",
      quality = "medium",
    } = options;

    const outputFileName = `processed_${Date.now()}.${outputFormat}`;
    const outputPath = path.join(this.outputDir, outputFileName);

    return new Promise((resolve, reject) => {
      let command = ffmpeg(inputPath);

      if (addBackgroundMusic && musicPath) {
        command = command
          .input(musicPath)
          .complexFilter([
            `[1:a]volume=${musicVolume}[music]`,
            "[0:a][music]amix=inputs=2:duration=longest",
          ]);
      }

      // Add quality presets
      switch (quality) {
        case "high":
          command.audioBitrate("192k");
          break;
        case "medium":
          command.audioBitrate("128k");
          break;
        case "low":
          command.audioBitrate("96k");
          break;
      }

      command
        .toFormat(outputFormat)
        .on("end", () => resolve(outputPath))
        .on("error", (err) => reject(err))
        .save(outputPath);
    });
  }

    // New method to compress audio
    async compressAudio(inputPath, outputPath) {
      return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .output(outputPath)
          .audioCodec('libmp3lame')
          .audioBitrate('96k')
          .audioChannels(1)
          .audioFrequency(16000)
          .on('end', () => resolve(outputPath))
          .on('error', (err) => reject(err))
          .run();
      });
    }


  // Existing method for adding background music
  async addBackgroundMusic(
    voicePath,
    musicPath,
    outputPath,
    musicVolume = 0.1
  ) {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(voicePath)
        .input(musicPath)
        .complexFilter([
          `[1:a]volume=${musicVolume}[music]`,
          "[0:a][music]amix=inputs=2:duration=longest",
        ])
        .on("end", () => resolve(outputPath))
        .on("error", (err) => reject(err))
        .save(outputPath);
    });
  }

   // Existing method for combining audio tracks
  async combineAudioTracks(tracks, outputPath) {
    return new Promise((resolve, reject) => {
      const command = ffmpeg();

      tracks.forEach((track) => {
        command.input(track);
      });

      const filterComplex =
        tracks.map((_, index) => `[${index}:a]`).join("") +
        `concat=n=${tracks.length}:v=0:a=1[out]`;

      command
        .complexFilter(filterComplex, ["out"])
        .on("end", () => resolve(outputPath))
        .on("error", (err) => reject(err))
        .save(outputPath);
    });
  }
}

module.exports = new AudioProcessor();
