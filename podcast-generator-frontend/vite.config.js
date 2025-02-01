//vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'  // import Tailwind CSS

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // keeps React plugin for Vite
  css: {
    postcss: {
      plugins: [tailwindcss], // adds Tailwind CSS to PostCSS plugins
    },
  },
})
