@echo off
REM Dependency Checker for Movie Booking System

echo 🔍 Checking Movie Booking System Dependencies...
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js: 
    node --version
) else (
    echo ❌ Node.js not found! Please install Node.js from https://nodejs.org/
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm: 
    npm --version
) else (
    echo ❌ npm not found! Please install Node.js which includes npm
)

echo.
echo 📁 Checking Backend Dependencies...
cd backend
if exist "package.json" (
    echo ✅ package.json found
    if exist "node_modules" (
        echo ✅ Dependencies installed
    ) else (
        echo ⚠️  Dependencies not installed. Run: npm install
    )
) else (
    echo ❌ Backend package.json not found!
)

if exist "database.sqlite" (
    echo ✅ Database exists
) else (
    echo ⚠️  Database not found. Run: npm run seed
)

cd ..

echo.
echo 📁 Checking Frontend Dependencies...
cd frontend
if exist "package.json" (
    echo ✅ package.json found
    if exist "node_modules" (
        echo ✅ Dependencies installed
    ) else (
        echo ⚠️  Dependencies not installed. Run: npm install
    )
) else (
    echo ❌ Frontend package.json not found!
)

cd ..

echo.
echo 🎬 Checking Movie Assets...
cd movie
if exist "*.avif" (
    echo ✅ Movie posters found
) else (
    echo ⚠️  Movie posters missing
)

cd ..

echo.
echo 🎯 System Status Summary:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo If all items show ✅, your system is ready!
echo If you see ⚠️  or ❌, follow the suggestions above.
echo.
echo 🚀 To start the application:
echo    1. Run: .\setup.bat
echo    2. Or manually: cd backend ^&^& npm start (then cd ../frontend ^&^& npm run dev)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pause