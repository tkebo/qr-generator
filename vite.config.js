import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'public', // აქედან ეძებს index.html-ს
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})

