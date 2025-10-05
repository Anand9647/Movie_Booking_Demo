import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When deploying to GitHub Pages under a repo named `movie_booking_demo`,
// set base to '/movie_booking_demo/'. If you will use a different repo name,
// update the BASE_REPO_NAME environment variable or change this string.
const repoName = process.env.BASE_REPO_NAME || 'movie_booking_demo'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})
