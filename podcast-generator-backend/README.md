# PodcastGen Backend

<img src="./assets/podcast.png" alt="PodAI Creator Logo" width="750">

## Description

This is the backend for the **PodcastGen** application. It provides a RESTful API for converting text and audio into podcasts using AI technologies. The backend is built using **Express.js**, integrates with the **Google Gemini API**, **Web Speech API**, and **ElevenLabs API**, and allows for audio file uploads and processing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Features](#features)
- [Folder Structure](#folder-structure)

## Installation

1. **Clone the repository** to your local machine:

```bash
git clone https://github.com/incognito1025/podcast-generator-backend.git
cd podcast-generator-backend
```

2. **Install the dependencies**:

```bash
npm install
```

   This will install all necessary dependencies from `package.json`.

3. **Set up environment variables**: 
   
   Create a `.env` file in the root of the project and include your API keys and any other required credentials:
   
   ```bash
   GOOGLE_API_KEY=your_google_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

## Usage

1. **Start the server** in development mode using `nodemon` for auto-reloading:

```bash
npm run dev
```

   Or in production mode using `node`:

```bash
npm start
```

2. The backend server will be accessible at `http://localhost:3000`.

## Technologies

This backend uses the following technologies:

- **Express.js** for creating the RESTful API.
- **Google Gemini API** for text transformation.
- **Web Speech API** for text-to-speech conversion.
- **ElevenLabs API** for high-quality voice generation.
- **Multer** for handling file uploads.
- **Ffmpeg** for audio processing.

[![My Skills](https://skillicons.dev/icons?i=js,html,css,vscode,express)](https://skillicons.dev)

## Dependencies

Here are the main dependencies and devDependencies you need to install:

### Dependencies

- **express**: Web framework for Node.js.
- **dotenv**: Loads environment variables from `.env` file.
- **axios**: For making HTTP requests to external APIs.
- **multer**: For handling file uploads.
- **fluent-ffmpeg**: For audio file processing.
- **@google/generative-ai**: Google Gemini API integration.
- **elevenlabs**: ElevenLabs API for text-to-speech.
- **joi**: For validating inputs.
- **swagger-ui-express & swagger-jsdoc**: For API documentation.
- **uuid**: For generating unique identifiers.
- **@ffmpeg-installer/ffmpeg & ffmpeg-static**: FFmpeg installation.

### DevDependencies

- **nodemon**: Development tool for auto-reloading the server.

To install the dependencies, run:

```bash
npm install
```

## Features

- **Audio File Upload**: Allows users to upload audio files.
- **Text-to-Audio Conversion**: Converts text to audio using Web Speech API or ElevenLabs API.
- **Podcast Generation**: Converts text transcripts or audio into podcasts.
- **API Endpoints**: Includes endpoints for creating and fetching podcasts, processing audio, and handling file uploads.

## Folder Structure

The directory structure is as follows:

``
├──
├── API_TESTING_GEMINI.md                            # Instructions and notes about testing the GEMINI APIs.
├── API_TESTING_ELEVEN.md                     # Specific notes for testing ElevenLabs API.
├── README.md                                 # Project description, setup instructions, and other useful details.
├── api                                       # Directory for external API integration files.
│   ├── elevenLabsAPI.js                      # API client setup and functions to interact with ElevenLabs API.
│   └── geminiAPI.js                          # API client for interacting with the Gemini API.
├── app.js                                    # Main entry point for the Express app, initial setup, and middlewares.
├── config                                    # Configuration files for the application.
│   └── audio-config.js                       # Configurations related to audio processing.
├── controllers                               # Folder for logic and handling of API routes.
│   ├── advanced                              # Controllers with advanced functionalities (audio processing).
│   │   └── audioController.js                # Handles audio processing-related requests.
│   ├── elevenLabsController.js               # Controller for handling ElevenLabs API-related requests.
│   ├── podcastController.js                  # Controller for managing podcast-related logic.
│   ├── transcriptController.js               # Controller for handling transcripts.
│   └── uploadController.js                   # Controller to manage file uploads (e.g., audio files).
├── generated                                 # Folder where generated audio files are saved (e.g., TTS files).
│   ├── tts_1738536469581.mp3                # Example generated audio files.
│   ├── tts_1738536516077.mp3                # Another example generated audio file.
│   ├── tts_1738536627046.mp3                # More generated audio files.
│   └── tts_1738536953703.mp3                # Another generated audio file.
├── middleware                                # Folder for custom middleware used in the Express app.
│   ├── errorHandler.js                       # Error handling middleware.
│   └── uploadAudio.js                        # Middleware to handle audio file uploads.
├── package-lock.json                         # Lockfile to ensure consistent npm dependency versions.
├── package.json                              # Project metadata, dependencies, scripts, and other configurations.
├── routes                                    # Routes that handle incoming HTTP requests and connect them to controllers.
│   ├── advanced                              # Routes related to advanced features like audio processing.
│   │   └── audioRoutes.js                    # Routes to handle audio-related API requests.
│   ├── elevenLabsRoutes.js                   # Routes for ElevenLabs-related functionality.
│   └── podcastRoutes.js                      # Routes for podcast-related functionality.
├── server.js                                 # The Express server initialization, connection settings, and listening.
├── services                                  # Services for business logic, data processing, and external service communication.
│   ├── audioProcessor.js                     # Service for processing and transforming audio data.
│   └── elevenLabsService.js                  # Service to handle business logic for ElevenLabs API integration.
├── sessions                                  # Folder for session-related documents and learning resources.
│   ├── KnowledgeAssessment                   # Folder for Knowledge Assessment sessions, each with its topic.
│   │   ├── AudioProcessingInTheBrowser.md    # Document explaining browser-based audio processing.
│   │   ├── ExpressServerSetupAndRouting.md   # Guide on setting up and routing with Express.
│   │   ├── GeminiAPICapabilities.md         # Documentation about capabilities of the Gemini API.
│   │   ├── KnowledgeAssessment.md            # The main assessment for knowledge checks.
│   │   ├── RESTfulAPIDesignPrinciples.md     # Principles and best practices for designing RESTful APIs.
│   │   ├── ReactHooks(useState,useEffect,useRef).md # Introduction and usage of React Hooks.
│   │   └── WebSpeechAPIFundamentals.md      # Fundamentals of using the Web Speech API.
├── uploads                                   # Folder where uploaded files (like audio) will be stored temporarily.
└── utils                                     # Utility functions for different purposes across the project.
    └── bufferManager.js                      # Utility to manage buffers, possibly for audio data or streams.

```

## API Documentation

The backend API is documented with **Swagger UI**. You can access the documentation by navigating to `http://localhost:3000/api-docs`.

---

This should give a clear overview of how to set up and run the podcast generator backend. Feel free to adjust the paths and links to fit your project structure!