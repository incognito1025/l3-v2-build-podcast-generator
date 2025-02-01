// src/components/PodcastPlayer.jsx
import React, { useState, useRef } from 'react';

const PodcastPlayer = ({ audioFile }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!audioFile) {
    return <p>No audio file uploaded.</p>;
  }

  const audioUrl = URL.createObjectURL(audioFile);

  const handlePlayStop = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <h3>Podcast Player</h3>
      <audio ref={audioRef} controls>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={handlePlayStop}>
        {isPlaying ? 'Stop' : 'Play'} Podcast
      </button>
    </div>
  );
};

export default PodcastPlayer;