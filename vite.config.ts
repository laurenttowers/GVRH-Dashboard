import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/gvrh-bot-admin-dashboard/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
