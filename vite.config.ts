import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/xmbank-field-notes-2026/' : '/',
  plugins: [react()],
})
