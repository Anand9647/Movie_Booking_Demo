@echo off
REM Movie Booking System - Windows Setup Script
REM This script sets up the complete development environment

echo 🎬 Setting up Movie Booking System...
echo.

REM Backend Setup
echo 📁 Setting up Backend (Node.js + Express + SQLite)...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed ✅
)

REM Check if database needs setup
if not exist "database.sqlite" (
    echo Setting up database with sample data...
    call npm run seed
) else (
    echo Database already exists ✅
)

echo Starting backend server...
start "Backend Server" cmd /k "npm start"
timeout /t 3 /nobreak >nul

cd ..

REM Frontend Setup
echo.
echo 📁 Setting up Frontend (React + Vite)...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed ✅
)

echo Starting frontend development server...
start "Frontend Server" cmd /k "npm run dev"

cd ..

echo.
echo 🚀 Setup Complete!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎭 Movie Booking System is now running:
echo    • Backend API: http://localhost:4000
echo    • Frontend:    http://localhost:5173
echo.
echo 🎬 Features Available:
echo    ✅ 5 Movies with poster images
echo    ✅ Interactive seat selection
echo    ✅ Demo payment gateway
echo    ✅ Real-time booking system
echo.
echo 🌐 Open http://localhost:5173 in your browser to start!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pause