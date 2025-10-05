# GitHub Pages Deployment Guide

## ✅ What Was Configured

This repository has been set up for automatic deployment to GitHub Pages with the following changes:

### 1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- Automatically triggers on push to `main` or `master` branch
- Builds the frontend React app
- Deploys to `gh-pages` branch
- Uses correct repository name: `Movie_Booking_Demo`

### 2. **Static Demo Mode**
The app now runs in two modes:

#### Local Development Mode (with Backend)
- Connects to `http://localhost:4000/api`
- Full functionality with database
- Real-time seat booking

#### GitHub Pages Mode (Static Demo)
- Uses mock data from `frontend/src/mockData.js`
- No backend required
- Simulated booking experience
- All 5 movies with posters included
- Demo payment flow works end-to-end

### 3. **Files Modified**

- **`vite.config.js`**: Updated base path to match repo name `Movie_Booking_Demo`
- **`frontend/vite.config.js`**: Copy of vite config for frontend builds
- **`frontend/src/App.jsx`**: Detects GitHub Pages and uses mock API
- **`frontend/src/components/MovieList.jsx`**: Handles poster URLs for static deployment
- **`frontend/src/components/SeatSelector.jsx`**: Uses mock API for bookings on GitHub Pages
- **`frontend/src/mockData.js`**: Mock data and API for static deployment
- **`frontend/public/posters/`**: Movie posters copied for static serving
- **`frontend/public/.nojekyll`**: Ensures GitHub Pages serves all files correctly
- **`README.md`**: Added GitHub Pages information and live demo link

### 4. **How to Enable GitHub Pages**

If GitHub Pages is not already enabled:

1. Go to repository Settings
2. Navigate to "Pages" section
3. Under "Source", select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click "Save"

### 5. **How Deployment Works**

```
Push to main → GitHub Actions Workflow Triggers → Build Frontend → Deploy to gh-pages Branch → Live on GitHub Pages
```

**Timeline**: Deployment typically completes in 2-3 minutes after push.

### 6. **Live Demo URL**

Once GitHub Pages is enabled, the site will be available at:
```
https://anand9647.github.io/Movie_Booking_Demo/
```

### 7. **Testing the Deployment**

After the workflow completes:

1. Visit the live URL above
2. You should see "Static Demo" indicator in the header
3. Click on any movie's showtime
4. Select seats (some will be randomly "booked" for realism)
5. Enter name and email
6. Click "Pay & Book Now"
7. Demo payment modal appears
8. Click "Pay Now" button
9. Success message appears with booking ID
10. Note indicates it's a static demo (bookings not persisted)

### 8. **Differences Between Local and GitHub Pages**

| Feature | Local Development | GitHub Pages |
|---------|------------------|--------------|
| Backend API | ✅ Running on localhost:4000 | ❌ Not available |
| Database | ✅ SQLite with real persistence | ❌ Mock data only |
| Seat Booking | ✅ Persisted to database | ⚠️ Simulated (not saved) |
| Movie Data | ✅ From database | ⚠️ From mockData.js |
| Payment | ✅ Demo gateway | ✅ Demo gateway (same) |
| Page Reload | ✅ Seat bookings persist | ❌ Resets to mock data |

### 9. **Customization**

To customize the deployment:

- **Change Repository Name**: Update `BASE_REPO_NAME` in `.github/workflows/deploy.yml` and `frontend/vite.config.js`
- **Add More Movies**: Edit `frontend/src/mockData.js` and add poster files to `frontend/public/posters/`
- **Modify Seat Layout**: Update `generateMockSeats()` function in `mockData.js`

### 10. **Troubleshooting**

If GitHub Pages doesn't work:

1. Check Actions tab for build errors
2. Ensure `gh-pages` branch was created
3. Verify GitHub Pages is enabled in Settings
4. Check that base URL matches your repository name
5. Clear browser cache and try again

## 🎉 Summary

Your Movie Booking Demo is now configured for automatic GitHub Pages deployment! Every push to `main` will trigger a new deployment, and the site will run as a static demo with mock data. Users can browse movies, select seats, and go through the booking flow without needing a backend server.
