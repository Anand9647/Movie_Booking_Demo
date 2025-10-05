#!/bin/bash
# Movie Booking System - Setup Script (Node.js)
# This script sets up the complete development environment

echo "🎬 Setting up Movie Booking System..."
echo ""

# Backend Setup
echo "📁 Setting up Backend (Node.js + Express + SQLite)..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed ✅"
fi

# Check if database exists and has data
if [ ! -f "database.sqlite" ] || [ $(wc -c < database.sqlite) -lt 10000 ]; then
    echo "Setting up database with sample data..."
    npm run seed
else
    echo "Database already exists with data ✅"
fi

echo "Starting backend server..."
npm start &
BACKEND_PID=$!
echo "Backend running on http://localhost:4000 (PID: $BACKEND_PID)"

cd ..

# Frontend Setup
echo ""
echo "📁 Setting up Frontend (React + Vite)..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed ✅"
fi

echo "Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!
echo "Frontend running on http://localhost:5173 (PID: $FRONTEND_PID)"

cd ..

echo ""
echo "🚀 Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎭 Movie Booking System is now running:"
echo "   • Backend API: http://localhost:4000"
echo "   • Frontend:    http://localhost:5173"
echo ""
echo "🎬 Features Available:"
echo "   ✅ 5 Movies with poster images"
echo "   ✅ Interactive seat selection"
echo "   ✅ Demo payment gateway"
echo "   ✅ Real-time booking system"
echo ""
echo "🛑 To stop servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"