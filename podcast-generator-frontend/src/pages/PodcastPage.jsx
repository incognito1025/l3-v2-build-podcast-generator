// src/pages/PodcastPage.jsx
import React, { useState, useEffect } from "react";

const PodcastPage = ({ transcript }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState(null);

  useEffect(() => {
    // Get available voices and set the default if there's no current speech object
    window.speechSynthesis.onvoiceschanged = () => {
      if (!speech) {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setSpeech(new SpeechSynthesisUtterance());
        }
      }
    };
  }, [speech]);

  const handlePlay = (text) => {
    if (speechSynthesis.speaking) {
      // If speech is already speaking, stop it
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Create a new SpeechSynthesisUtterance object
      const newSpeech = new SpeechSynthesisUtterance(text);
      // Optionally, you can change voice, rate, pitch here
      newSpeech.voice = speechSynthesis.getVoices()[0]; // Choose the first available voice
      newSpeech.rate = 1; // Speed (1.0 = normal speed)
      newSpeech.pitch = 1; // Pitch level

      // Start speaking the text
      speechSynthesis.speak(newSpeech);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (speechSynthesis.speaking) {
      // Stop speaking
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Podcast Generated!</h2>
      <p className="mb-4">
        Here you can play your podcast or see the generated details.
      </p>

      <div className="flex space-x-4">
      <button
  onClick={() => handlePlay(transcript || "No transcript available.")}
  className="generate-button" /* Apply new class here */
>
  {isPlaying ? "Stop Podcast" : "Play Podcast"}
</button>

<button
  onClick={handleStop}
  className="generate-button" /* Apply new class here */
>
  Stop
</button>

      </div>
    </div>
  );
};

export default PodcastPage;
