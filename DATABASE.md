# Movie Booking System - Database Documentation

## 🗄️ Database Overview

### Technology Stack
- **Database**: SQLite (file-based, no server required)
- **ORM**: Sequelize (Object-Relational Mapping)
- **Location**: `backend/database.sqlite`

## 📋 Database Schema

### 1. Movies Table
```sql
CREATE TABLE Movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  durationMin INTEGER,
  posterUrl VARCHAR(255),
  rating FLOAT DEFAULT 0,
  votes INTEGER DEFAULT 0,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

### 2. Showtimes Table
```sql
CREATE TABLE Showtimes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time DATETIME NOT NULL,
  MovieId INTEGER REFERENCES Movies(id),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

### 3. Seats Table
```sql
CREATE TABLE Seats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  row VARCHAR(255) NOT NULL,
  number INTEGER NOT NULL,
  status TEXT DEFAULT 'available', -- 'available' | 'booked'
  ShowtimeId INTEGER REFERENCES Showtimes(id),
  BookingId INTEGER REFERENCES Bookings(id),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

### 4. Bookings Table
```sql
CREATE TABLE Bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customerName VARCHAR(255),
  customerEmail VARCHAR(255),
  amountCents INTEGER,
  status TEXT DEFAULT 'pending', -- 'pending' | 'paid' | 'failed'
  razorpayPaymentId VARCHAR(255),
  razorpayOrderId VARCHAR(255),
  ShowtimeId INTEGER REFERENCES Showtimes(id),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

## 🔗 Database Relationships

```
Movies (1) ──── (Many) Showtimes
  │
  └── Each movie has multiple showtimes

Showtimes (1) ──── (Many) Seats
  │
  └── Each showtime has 60 seats (A-F rows × 1-10 numbers)

Showtimes (1) ──── (Many) Bookings
  │
  └── Each showtime can have multiple bookings

Bookings (1) ──── (Many) Seats
  │
  └── Each booking can reserve multiple seats
```

## 🚀 Database Initialization Process

### 1. Model Definition (`backend/models/index.js`)
- Defines table structure using Sequelize models
- Sets up relationships between tables
- Configures data types and constraints

### 2. Database Sync (`backend/index.js`)
```javascript
await sequelize.sync(); // Creates tables if they don't exist
```

### 3. Data Seeding (`backend/seed.js`)
```javascript
// Populates database with sample data:
// - 5 movies (Inception, Dark Knight, etc.)
// - 2 showtimes per movie
// - 60 seats per showtime (A-F rows, 1-10 numbers each)
```

## 📊 Sample Data Structure

### Movies (5 records)
```javascript
{
  title: "Inception",
  description: "A mind-bending thriller...",
  durationMin: 148,
  posterUrl: "/posters/inception.jpg",
  rating: 8.8,
  votes: 2500000
}
```

### Showtimes (10 records total - 2 per movie)
```javascript
{
  time: "2025-10-05T15:00:00Z",
  MovieId: 1
}
```

### Seats (600 records total - 60 per showtime)
```javascript
{
  row: "A",
  number: 1,
  status: "available",
  ShowtimeId: 1
}
```

## 🔧 Database Operations

### Reading Data
```javascript
// Get all movies with showtimes
const movies = await Movie.findAll({ include: Showtime });

// Get seats for a showtime
const seats = await Seat.findAll({ where: { ShowtimeId: 1 } });
```

### Booking Transaction
```javascript
const t = await sequelize.transaction();
try {
  // 1. Lock seats
  const seatRecords = await Seat.findAll({
    where: { ShowtimeId, [Op.or]: requestedSeats },
    transaction: t,
    lock: t.LOCK.UPDATE
  });
  
  // 2. Create booking
  const booking = await Booking.create({...}, { transaction: t });
  
  // 3. Update seat status
  for (const seat of seatRecords) {
    seat.status = 'booked';
    seat.BookingId = booking.id;
    await seat.save({ transaction: t });
  }
  
  await t.commit();
} catch (error) {
  await t.rollback();
}
```

## 🛠️ Maintenance Commands

### Reset Database
```bash
# Delete database file and restart server
rm backend/database.sqlite
cd backend && node index.js
```

### Reseed Data
```bash
cd backend
node seed.js
```

### Check Database Structure
```javascript
// Use SQLite browser or run SQL queries
const [results] = await sequelize.query("PRAGMA table_info(Movies);");
```

## 📈 Performance Considerations

1. **Indexes**: Add indexes on frequently queried columns
2. **Transactions**: Used for booking to ensure data consistency
3. **Connection Pooling**: Sequelize handles connection management
4. **Query Optimization**: Use includes for related data fetching

## 🔒 Data Integrity

- **Foreign Key Constraints**: Maintain referential integrity
- **Enums**: Restrict status values to valid options
- **Transactions**: Ensure atomic operations for bookings
- **Validation**: Sequelize model validations prevent invalid data