// src/components/TranscriptInput.jsx
import React, { useState } from 'react';

const TranscriptInput = ({ transcript, setTranscript }) => {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const synth = window.speechSynthesis;

  const speak = (e) => {
    e.preventDefault();
    if (synth.speaking) {
      console.error('Already speaking');
      return;
    }
    if (transcript !== '') {
      const utterThis = new SpeechSynthesisUtterance(transcript);
      utterThis.pitch = pitch;
      utterThis.rate = rate;
      synth.speak(utterThis);
    }
  };

  return (
    <div>
      <h3>Enter Transcript</h3>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Enter transcript here..."
        rows="6"
        cols="50"
        className="border border-[#333] p-2 rounded w-full"
      />
      <div>
        <label>
          Pitch:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            className="border border-[#333] p-2 rounded"
          />
          <span>{pitch}</span>
        </label>
      </div>
      <div>
        <label>
          Rate:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="border border-[#333] p-2 rounded"
          />
          <span>{rate}</span>
        </label>
      </div>
      <button
        onClick={speak}
        className="create-button"
      >
        Play Transcript
      </button>
    </div>
  );
};

export default TranscriptInput;
