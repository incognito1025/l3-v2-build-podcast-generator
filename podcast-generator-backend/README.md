# PodcastGen Backend

![PodAI Creator Logo](./assets/podcast.png)

## Description

PodcastGen Backend provides a **RESTful API** for converting text and audio into podcasts using advanced AI technologies. Built with **Express.js**, it integrates the **Google Gemini API**, **Web Speech API**, and **ElevenLabs API** to handle audio file uploads, processing, and podcast generation.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)

## Installation

### Clone the Repository
To clone the repository to your local machine, run:
```bash
git clone https://github.com/incognito1025/podcast-generator-backend.git
cd podcast-generator-backend
```

### Install Dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add your API keys:
```plaintext
GEMINI_API_KEY=your_google_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

## Usage

### Start the Server
To start the server in **development mode**, run:
```bash
npm run dev
```
For **production mode**, use:
```bash
npm start
```
The backend server will run at **http://localhost:3030**.

## Technologies

This project uses the following technologies:
- **Express.js**: Web framework for Node.js
- **Google Gemini API**: Text transformation and AI generation
- **Web Speech API**: Text-to-speech conversion
- **ElevenLabs API**: High-quality voice generation
- **Multer**: File upload handling
- **FFmpeg**: Audio file processing

## Dependencies

### Main Dependencies
- `express`: Web framework for building the API
- `dotenv`: Loads environment variables from a `.env` file
- `axios`: HTTP client for making API requests
- `multer`: Handles file uploads
- `fluent-ffmpeg`: FFmpeg integration for audio processing
- `@google/generative-ai`: Google Gemini API client
- `uuid`: Generate unique IDs
- `@ffmpeg-installer/ffmpeg`: FFmpeg installer for Node.js
- `ffmpeg-static`: Provides static FFmpeg binaries

### Dev Dependencies
- `nodemon`: Automatically restarts the server during development

To install all dependencies, run:
```bash
npm install
```

## Features

- **Audio File Upload**: Supports uploading audio files for processing.
- **Text-to-Audio Conversion**: Converts text into high-quality audio.
- **Podcast Generation**: Creates podcasts by combining text, audio, and generated speech.
- **RESTful API Endpoints**: Provides endpoints for uploading files and managing podcasts.

## Folder Structure

```plaintext
📦 podcast-generator-backend
├── README.md                     # Project documentation
├── api
│   ├── elevenLabsAPI.js          # Integration with ElevenLabs API
│   └── geminiAPI.js              # Integration with Google Gemini API
├── app.js                        # Entry point for the Express app
├── config
│   └── audio-config.js           # Configuration for audio processing
├── controllers
│   ├── audioController.js        # Handles audio file processing
│   ├── podcastController.js      # Manages podcast creation
│   ├── transcriptController.js   # Handles transcript-related functionality
│   └── uploadController.js       # Manages file uploads
├── generated                     # Folder for storing generated podcast files
├── middleware
│   ├── errorHandler.js           # Error handling middleware
│   └── uploadAudio.js            # Middleware for handling audio uploads
├── routes
│   ├── audioRoutes.js            # Routes for audio processing
│   ├── elevenLabsRoutes.js       # Routes for ElevenLabs API
│   └── podcastRoutes.js          # Routes for podcast-related operations
├── services
│   ├── audioProcessor.js         # Logic for processing audio files
│   └── elevenLabsService.js      # Business logic for ElevenLabs API
├── utils
│   └── bufferManager.js          # Utility for handling audio buffers
└── uploads                       # Directory for storing uploaded audio files
```