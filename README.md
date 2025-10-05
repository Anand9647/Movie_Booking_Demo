# 🎬 Movie Booking System

A full-stack movie booking application with seat selection and demo payment integration.

## 🌐 Live Demo

**GitHub Pages:** [https://anand9647.github.io/Movie_Booking_Demo/](https://anand9647.github.io/Movie_Booking_Demo/)

The GitHub Pages deployment runs as a static demo with mock data. For the full experience with backend API, follow the local setup instructions below.

## 🛠️ Technology Stack

- **Backend**: Node.js + Express + Sequelize + SQLite
- **Frontend**: React + Vite
- **Database**: SQLite with Sequelize ORM
- **Payment**: Demo Payment Gateway
- **Authentication**: Demo (no real auth implemented)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### 🎯 One-Click Setup (Recommended)
```bash
# Run the automated setup script (Windows)
.\setup.bat

# Or for Unix/macOS
chmod +x setup.sh && ./setup.sh
```

### 📋 Manual Setup

1. **Clone and install backend dependencies:**
   ```bash
   cd C:\Users\soura\MovieBooking\backend
   npm install
   ```

2. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

3. **Start the backend server:**
   ```bash
   npm start
   # Backend runs at http://localhost:4000
   ```

4. **In a new terminal, setup frontend:**
   ```bash
   cd C:\Users\soura\MovieBooking\frontend
   npm install
   npm run dev
   # Frontend runs at http://localhost:5173
   ```

### 🔍 Check Dependencies
```bash
# Check if everything is properly installed
.\check-dependencies.bat
```

## 🎯 Features

### ✅ Implemented
- [x] Movie browsing with poster images
- [x] Showtime selection
- [x] Interactive seat selection (A-F rows, 1-10 seats)
- [x] Booking form with customer details
- [x] Demo payment gateway integration
- [x] Real-time seat availability
- [x] Transaction-safe booking process
- [x] Responsive cinematic UI design

### 🚧 Possible Enhancements
- [ ] User authentication & profiles
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] Booking history & management
- [ ] Email/SMS confirmations
- [ ] Admin dashboard
- [ ] Multiple cinema locations
- [ ] Advanced filtering & search

## 📊 Database Schema

See [DATABASE.md](./DATABASE.md) for detailed database documentation.

## 📦 Dependencies & Environment

See [DEPENDENCIES.md](./DEPENDENCIES.md) for complete dependency management and environment setup guide.

**Quick Overview:**
- **Movies** (5 sample movies with posters)
- **Showtimes** (2 per movie)
- **Seats** (60 per showtime: A-F × 1-10)
- **Bookings** (customer details + payment info)

## 🎨 UI Screenshots

The application features a modern cinematic design with:
- Gradient backgrounds and movie theater aesthetics
- Smooth animations and hover effects
- Responsive seat selection grid
- Modal-based payment flow

## 🔧 Development

### Project Structure
```
MovieBooking/
├── backend/              # Express.js API server
│   ├── models/          # Sequelize database models
│   ├── index.js         # Main server file
│   ├── seed.js          # Database seeding script
│   └── database.sqlite  # SQLite database file
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   └── styles.css   # Cinematic styling
│   └── index.html
├── movie/               # Movie poster images
├── DATABASE.md          # Database documentation
└── README.md
```

### API Endpoints
- `GET /api/movies` - Get all movies with showtimes
- `GET /api/movies/:id` - Get specific movie details
- `GET /api/showtimes/:id/seats` - Get seats for showtime
- `POST /api/create-order` - Create demo payment order
- `POST /api/verify-payment` - Verify demo payment
- `POST /api/bookings` - Create booking with seat reservation

## 🎭 Demo Data

The system comes pre-seeded with:
- **5 Movies**: Inception, The Dark Knight, Interstellar, Tenet, Dunkirk
- **Movie Posters**: High-quality images stored locally
- **Showtimes**: Multiple times per movie
- **Seats**: Full theater layout (60 seats per showtime)

## 💳 Payment Integration

Currently uses a **Demo Payment Gateway** that simulates the Razorpay flow:
- Order creation with unique IDs
- Payment processing simulation
- Success/failure handling
- Transaction tracking

## 🚀 Deployment Ready

The application is ready for deployment with:
- Environment variable configuration
- Production-ready database schema
- Error handling and validation
- CORS setup for cross-origin requests

### GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages:

1. **Automatic Deployment**: Push to `main` branch triggers GitHub Actions workflow
2. **Live URL**: [https://anand9647.github.io/Movie_Booking_Demo/](https://anand9647.github.io/Movie_Booking_Demo/)
3. **Static Demo Mode**: GitHub Pages deployment uses mock data (no backend required)

To deploy to your own GitHub Pages:
1. Fork this repository
2. Enable GitHub Pages in repository settings (set source to `gh-pages` branch)
3. Push changes to `main` branch - automatic deployment will trigger
4. Update the `BASE_REPO_NAME` in `.github/workflows/deploy.yml` if your repo name differs

### Local Development with Backend

For the full experience with backend API and database, follow the Quick Start guide above.

---

**Enjoy your movie booking experience!** 🎬🍿

Notes:
- Payment is mocked. To integrate real payments, add Stripe on the backend and replace the mock payment processing in `backend/index.js`.
- This is a starting point. Add authentication, seat hold windows, optimistic locking and real payment handling before using in production.
