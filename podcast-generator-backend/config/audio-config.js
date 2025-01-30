module.exports = {
    audio: {
      outputFormats: ['mp3', 'wav', 'ogg'],
      maxDuration: 3600, // max duration in seconds
      quality: {
        low: '96k',
        medium: '128k',
        high: '192k'
      },
      backgroundMusic: {
        defaultVolume: 0.1,
        fadeIn: 2,
        fadeOut: 2
      }
    },
    storage: {
      maxFileSize: 100 * 1024 * 1024, // 100MB
      allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg']
    }
  };