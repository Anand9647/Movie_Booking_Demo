import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use the repo name from env (set in workflow) or default to Movie_Booking_Demo
const repoName = process.env.BASE_REPO_NAME || 'Movie_Booking_Demo'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})
