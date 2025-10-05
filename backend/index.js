const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto');
const { sequelize, Movie, Showtime, Seat, Booking } = require('./models');
const { Op } = require('sequelize');

// Demo Payment Gateway
class DemoPaymentGateway {
  static generateOrderId() {
    return 'demo_order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  static generatePaymentId() {
    return 'demo_pay_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  static generateSignature(orderId, paymentId) {
    return crypto.createHash('sha256').update(orderId + '|' + paymentId + '|demo_secret').digest('hex');
  }
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Serve local poster images placed in the repository's "movie" folder
// Ensure AVIF files are served with proper MIME type (some environments default to octet-stream)
app.use('/posters', (req, res, next) => {
  if (req.path && req.path.toLowerCase().endsWith('.avif')) res.type('image/avif');
  next();
}, express.static(path.join(__dirname, '..', 'movie')));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Demo Payment Gateway config
app.get('/api/payment-config', (req, res) => {
  res.json({ 
    gateway: 'demo',
    keyId: 'demo_key_123456789',
    gatewayName: 'Demo Payments' 
  });
});

// Root helpful message
app.get('/', (req, res) => {
  res.send('<h2>MovieBooking backend</h2><p>Use the API under <code>/api</code>. Example: <a href="/api/health">/api/health</a></p>');
});

// Movies
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.findAll({ include: Showtime });
  res.json(movies);
});

app.get('/api/movies/:id', async (req, res) => {
  const movie = await Movie.findByPk(req.params.id, { include: Showtime });
  if (!movie) return res.status(404).json({ error: 'not found' });
  res.json(movie);
});

// Seats for a showtime
app.get('/api/showtimes/:id/seats', async (req, res) => {
  const seats = await Seat.findAll({ where: { ShowtimeId: req.params.id } });
  res.json(seats);
});

// Create Demo Payment Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;
    
    // Simulate order creation
    const order = {
      id: DemoPaymentGateway.generateOrderId(),
      entity: 'order',
      amount: Math.round(amount * 100), // Convert to paise
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: notes || {},
      created_at: Math.floor(Date.now() / 1000)
    };

    console.log('Demo order created:', order);
    res.json(order);
  } catch (error) {
    console.error('Demo order creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Demo Payment Verification (always succeeds)
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Demo verification - always successful
    console.log('Demo payment verification:', { razorpay_order_id, razorpay_payment_id });
    
    res.json({ 
      success: true, 
      message: 'Demo payment verified successfully',
      isDemo: true 
    });
  } catch (error) {
    console.error('Demo payment verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create booking (simple transactional seat reservation + mock payment)
app.post('/api/bookings', async (req, res) => {
  const { showtimeId, seats: requestedSeats, customerName, customerEmail, payment } = req.body;
  if (!showtimeId || !Array.isArray(requestedSeats) || requestedSeats.length === 0) {
    return res.status(400).json({ error: 'missing showtimeId or seats' });
  }

  const t = await sequelize.transaction();
  try {
    // lock/find seats
    const seatRecords = await Seat.findAll({
      where: {
        ShowtimeId: showtimeId,
        [Op.or]: requestedSeats.map(s => ({ row: s.row, number: s.number }))
      },
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (seatRecords.length !== requestedSeats.length) {
      await t.rollback();
      return res.status(400).json({ error: 'some seats not found' });
    }

    const alreadyBooked = seatRecords.filter(s => s.status === 'booked');
    if (alreadyBooked.length > 0) {
      await t.rollback();
      return res.status(400).json({ error: 'some seats already booked', seats: alreadyBooked });
    }

    const amountCents = seatRecords.length * 1000; // example: $10 per seat = 1000 cents

    const booking = await Booking.create({ customerName, customerEmail, amountCents, status: 'pending', ShowtimeId: showtimeId }, { transaction: t });

    // mark seats booked and associate to booking
    for (const s of seatRecords) {
      s.status = 'booked';
      s.BookingId = booking.id;
      await s.save({ transaction: t });
    }

    // Process demo payment
    if (payment && payment.razorpay_payment_id) {
      // Demo payment - always successful
      console.log('Processing demo payment:', payment);
      booking.status = 'paid';
      booking.razorpayPaymentId = payment.razorpay_payment_id;
      booking.razorpayOrderId = payment.razorpay_order_id;
    } else {
      // Fallback for demo/testing
      booking.status = 'paid';
    }
    await booking.save({ transaction: t });

    await t.commit();

    res.json({ success: true, bookingId: booking.id });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'internal error', details: err.message });
  }
});

(async () => {
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
})();
