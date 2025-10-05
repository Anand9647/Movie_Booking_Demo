const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

const Movie = sequelize.define('Movie', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  durationMin: DataTypes.INTEGER,
  posterUrl: DataTypes.STRING
  ,rating: { type: DataTypes.FLOAT, defaultValue: 0 }
  ,votes: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Showtime = sequelize.define('Showtime', {
  time: { type: DataTypes.DATE, allowNull: false }
});

const Seat = sequelize.define('Seat', {
  row: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('available','booked'), allowNull: false, defaultValue: 'available' }
});

const Booking = sequelize.define('Booking', {
  customerName: DataTypes.STRING,
  customerEmail: DataTypes.STRING,
  amountCents: DataTypes.INTEGER,
  status: { type: DataTypes.ENUM('pending','paid','failed'), defaultValue: 'pending' },
  razorpayPaymentId: DataTypes.STRING,
  razorpayOrderId: DataTypes.STRING
});

Movie.hasMany(Showtime, { onDelete: 'cascade' });
Showtime.belongsTo(Movie);

Showtime.hasMany(Seat, { onDelete: 'cascade' });
Seat.belongsTo(Showtime);

Booking.hasMany(Seat);
Seat.belongsTo(Booking);

Booking.belongsTo(Showtime);
Showtime.hasMany(Booking);

module.exports = { sequelize, Movie, Showtime, Seat, Booking };
