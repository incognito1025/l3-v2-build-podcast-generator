// src/components/AudioUploader.jsx
import React, { useState } from "react";

const AudioUploader = ({ onFileUpload }) => {
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        setError("Please upload a valid audio file.");
      } else if (file.size > 10 * 1024 * 1024) {
        // Limit to 10MB
        setError("File size is too large. Please upload a smaller file.");
      } else {
        setError(null);
        onFileUpload(file); // Callback to parent component
      }
    }
  };

  return (
    <div>
      <h3>Upload Your Podcast Audio</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="border border-[#333] p-2 rounded w-full"
      />
      {error && (
        <p className="text-red-500 border-t border-[#333] p-2 mt-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default AudioUploader;
