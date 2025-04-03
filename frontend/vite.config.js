import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: 'login', // Open the login page by default
  },
  plugins: [react()],
})
