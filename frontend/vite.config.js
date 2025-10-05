import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When deploying to GitHub Pages under a repo named `Movie_Booking_Demo`,
// set base to '/Movie_Booking_Demo/'. If you will use a different repo name,
// update the BASE_REPO_NAME environment variable or change this string.
const repoName = process.env.BASE_REPO_NAME || 'Movie_Booking_Demo'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})
