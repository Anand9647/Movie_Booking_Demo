# 📦 Dependencies & Environment Setup

## 🎯 Current Stack (Node.js - No Virtual Environment Needed)

Your movie booking system uses **Node.js/JavaScript** ecosystem, which uses **npm** for dependency management. Each folder has its own isolated dependencies through `package.json` files.

### Backend Dependencies (`backend/package.json`)
```json
{
  "dependencies": {
    "body-parser": "^1.20.2",     // Parse HTTP request bodies
    "cors": "^2.8.5",             // Cross-Origin Resource Sharing
    "dotenv": "^17.2.3",          // Environment variables
    "express": "^4.18.2",         // Web framework
    "razorpay": "^2.9.6",         // Payment gateway (demo only)
    "sequelize": "^6.32.1",       // ORM for database
    "sqlite3": "^5.1.6",          // SQLite database driver
    "stripe": "^19.1.0"           // Alternative payment gateway
  }
}
```

### Frontend Dependencies (`frontend/package.json`)
```json
{
  "dependencies": {
    "react": "^18.2.0",           // UI framework
    "react-dom": "^18.2.0"        // React DOM rendering
  },
  "devDependencies": {
    "vite": "^5.4.20",           // Build tool and dev server
    "@types/react": "^18.2.0",   // TypeScript types
    "@types/react-dom": "^18.2.0" // TypeScript types
  }
}
```

## 🚀 Quick Setup (Current Node.js Project)

### Option 1: Manual Setup
```bash
# Backend
cd backend
npm install
npm run seed
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Option 2: Automated Setup (Windows)
```batch
# Run the setup script
setup.bat
```

### Option 3: Automated Setup (Unix/macOS)
```bash
# Run the setup script
chmod +x setup.sh
./setup.sh
```

## 🐍 Alternative: Python Virtual Environment Setup

If you want to create a **Python version** of this project, here's how to set up a virtual environment:

### Prerequisites
- Python 3.8+ installed
- pip package manager

### Create Python Virtual Environment
```bash
# Navigate to project directory
cd C:\Users\soura\MovieBooking

# Create virtual environment
python -m venv movie_booking_env

# Activate virtual environment
# Windows
movie_booking_env\Scripts\activate

# macOS/Linux
source movie_booking_env/bin/activate

# Verify activation (should show virtual env path)
which python
```

### Python Dependencies (if converting to Python)
```bash
# Install Python web framework and database
pip install flask sqlalchemy sqlite3

# Install additional packages
pip install flask-cors python-dotenv requests

# Save dependencies
pip freeze > requirements.txt
```

### Python Requirements File (`requirements.txt`)
```
Flask==2.3.3
SQLAlchemy==2.0.21
Flask-CORS==4.0.0
python-dotenv==1.0.0
requests==2.31.0
sqlite3==3.41.2
```

## 🔧 Development Environment Setup

### Node.js Environment (Current)
```bash
# Check Node.js version
node --version  # Should be 16+ for best compatibility

# Check npm version
npm --version

# Install global tools (optional)
npm install -g nodemon  # Auto-restart server on changes
```

### Python Environment (Alternative)
```bash
# Check Python version
python --version  # Should be 3.8+

# Check pip version
pip --version

# Install virtual environment tools
pip install virtualenv virtualenvwrapper
```

## 📁 Project Structure with Dependencies

```
MovieBooking/
├── backend/                    # Node.js Backend
│   ├── node_modules/          # Backend dependencies (auto-generated)
│   ├── package.json           # Backend dependency list
│   ├── package-lock.json      # Exact dependency versions
│   └── ...
├── frontend/                   # React Frontend
│   ├── node_modules/          # Frontend dependencies (auto-generated)
│   ├── package.json           # Frontend dependency list
│   ├── package-lock.json      # Exact dependency versions
│   └── ...
├── setup.bat                   # Windows setup script
├── setup.sh                   # Unix/macOS setup script
└── requirements.txt            # Python deps (if converting)
```

## 🐳 Docker Environment (Advanced)

If you want containerized deployment:

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
```

## 🔒 Environment Variables

### Backend `.env` file
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=./database.sqlite
DEMO_PAYMENT_KEY=demo_key_123456789
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env` file
```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_PAYMENT_GATEWAY=demo
```

## 🎛️ Development Commands

### Backend Commands
```bash
npm start          # Start production server
npm run dev        # Start development server with auto-restart
npm run seed       # Populate database with sample data
npm test           # Run tests (if configured)
npm run lint       # Check code quality
```

### Frontend Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code quality
```

## 📊 Dependency Management

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest

# Security audit
npm audit
npm audit fix
```

### Lock Dependencies
- `package-lock.json` ensures exact versions across environments
- Commit lock files to version control
- Use `npm ci` in production for faster, reliable installs

## 🚀 Production Deployment

### Environment Setup
1. **Node.js**: Use Node.js 18+ LTS
2. **Process Manager**: PM2 for production
3. **Reverse Proxy**: Nginx for serving static files
4. **Database**: Consider PostgreSQL for production
5. **Environment**: Set `NODE_ENV=production`

### Production Commands
```bash
# Install production dependencies only
npm ci --production

# Start with PM2
npm install -g pm2
pm2 start index.js --name "movie-booking-backend"

# Build frontend for production
npm run build
```

Your current Node.js setup is already optimized and doesn't need virtual environments like Python! 🎬