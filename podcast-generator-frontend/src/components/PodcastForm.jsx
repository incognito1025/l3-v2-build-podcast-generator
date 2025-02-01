// src/components/PodcastForm.jsx
import React, { useState } from "react";
import { createPodcast } from "../api/podcastAPI"; // API function for creating a podcast
import AudioUploader from "./AudioUploader"; // Audio uploader component
import PodcastPlayer from "./PodcastPlayer"; // Podcast player component
import TranscriptInput from "./TranscriptInput"; // Transcript input component

const PodcastForm = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle file upload from AudioUploader component
  const handleFileUpload = (file) => {
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  // Handle audio file selection directly
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Generating podcast...", { title, description, transcript });

    if (!title || !description || !transcript || !audioFile) {
      alert("All fields are required.");
      return;
    }
    const podcastData = {
      title,
      description,
      transcript,
      audioFile,
    };

    try {
      const newPodcast = await createPodcast(podcastData); // Call the API function
      alert("Podcast Created Successfully!");
      console.log(newPodcast);
    } catch (error) {
      console.error("Error creating podcast:", error);
    }
  };

  // Check if speech synthesis is available
  if (!window.speechSynthesis) {
    alert("Speech synthesis is not supported in your browser.");
    return;
  }

  // Handle playing the transcript with speech synthesis
  const handlePlay = (text) => {
    if (!window.speechSynthesis.speaking) {
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.onend = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      } else {
        alert("Please provide a transcript to play.");
      }
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Stop the speech synthesis
  const handleStop = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto podcast-form">
      <h1 className="text-3xl font-bold mb-6">Create Your Podcast</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Podcast Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-[#333] p-2 rounded w-full"

        />
        <textarea
          placeholder="Podcast Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-[#333] p-2 rounded w-full"

        />

        {/* AudioUploader component for handling file upload */}
        <AudioUploader onFileUpload={handleFileUpload} />

        {/* PodcastPlayer component for audio playback */}
        <PodcastPlayer audioFile={audioFile} />

        {/* TranscriptInput component for handling transcript */}
        <TranscriptInput
          transcript={transcript}
          setTranscript={setTranscript}
        />

        <button
          type="submit"
          className="create-button"
        >
          Generate Podcast
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upload Podcast Audio</h2>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          className="border border-[#333] p-2 rounded w-full"

        />

        {audioUrl && (
          <div className="mt-4">
            <audio ref={setAudioRef} src={audioUrl} />
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handlePlay(transcript)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
              >
                {isPlaying ? "Stop Podcast" : "Play Podcast"}
              </button>

              <button
                onClick={handleStop}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastForm;
