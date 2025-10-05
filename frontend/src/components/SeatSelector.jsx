import React, { useMemo, useState } from 'react'
import DemoPaymentModal from './DemoPaymentModal'
import { mockAPI } from '../mockData'

const API = 'http://localhost:4000/api'

function groupSeats(seats) {
  const map = {};
  seats.forEach(s => {
    if (!map[s.row]) map[s.row] = [];
    map[s.row].push(s);
  });
  // sort numbers
  Object.keys(map).forEach(r => map[r].sort((a,b) => a.number - b.number));
  return map;
}

export default function SeatSelector({ seats, selectedSeats, setSelectedSeats, showtime, movie, isGithubPages }) {
  const rows = useMemo(() => groupSeats(seats), [seats]);
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [orderData, setOrderData] = useState(null)

  const resolvePoster = (p) => {
    if (!p) return '';
    if (isGithubPages) {
      return p; // On GitHub Pages, posters are served from the build
    }
    return p.startsWith('/posters') ? `http://localhost:4000${p}` : p;
  }

  const toggleSeat = (seat) => {
    if (seat.status === 'booked') return;
    const exists = selectedSeats.find(s => s.row === seat.row && s.number === seat.number);
    if (exists) setSelectedSeats(selectedSeats.filter(s => !(s.row === seat.row && s.number === seat.number)));
    else setSelectedSeats([...selectedSeats, { row: seat.row, number: seat.number }]);
  }

  const checkout = async () => {
    if (!customerName || !customerEmail) { setMessage('Enter name & email'); return }
    if (selectedSeats.length === 0) { setMessage('Select seats first'); return }
    
    setMessage('Creating order...')
    
    try {
      // Create demo order
      const orderData = {
        amount: total,
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          showtimeId: showtime.id,
          customerName,
          customerEmail,
          seats: selectedSeats.map(s => `${s.row}${s.number}`).join(',')
        }
      };
      
      let order;
      if (isGithubPages) {
        order = await mockAPI.createOrder(orderData);
      } else {
        const orderResponse = await fetch(API + '/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        order = await orderResponse.json();
        if (!orderResponse.ok) throw new Error(order.error);
      }
      
      // Show demo payment modal
      setOrderData({
        order_id: order.id,
        amount: order.amount,
        description: `${movie?.title} - ${selectedSeats.map(s => `${s.row}${s.number}`).join(', ')}`
      })
      setShowPaymentModal(true)
      setMessage('')
      
    } catch (err) {
      setMessage('Payment setup error: ' + err.message)
    }
  }

  const handlePaymentSuccess = async (paymentResponse) => {
    setShowPaymentModal(false)
    setMessage('Processing booking...')
    
    try {
      const bookingData = {
        showtimeId: showtime.id,
        seats: selectedSeats,
        customerName,
        customerEmail,
        payment: paymentResponse
      };
      
      let result;
      if (isGithubPages) {
        result = await mockAPI.createBooking(bookingData);
      } else {
        const bookingResponse = await fetch(API + '/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });
        result = await bookingResponse.json();
        if (!bookingResponse.ok) {
          throw new Error(result.error || 'Unknown error');
        }
      }
      
      setMessage(`🎉 Demo booking successful! Booking ID: ${result.bookingId}`)
      setSelectedSeats([])
      if (isGithubPages) {
        setMessage(msg => msg + ' (Note: This is a static demo - bookings are not persisted)')
      }
      setTimeout(() => {
        if (!isGithubPages) {
          window.location.reload()
        } else {
          setMessage(null);
        }
      }, 5000)
    } catch (err) {
      setMessage('Booking error: ' + err.message)
    }
  }

  const priceEach = 250 // ₹250 per seat
  const total = selectedSeats.length * priceEach

  return (
    <div>
      {movie && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'center', 
          marginBottom: '2rem', 
          padding: '1rem', 
          background: 'rgba(255,255,255,0.02)', 
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <img 
            src={resolvePoster(movie.posterUrl)} 
            alt={movie.title}
            style={{
              width: '60px',
              height: '90px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}
          />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{movie.title}</h3>
            <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {new Date(showtime.time).toLocaleString()}
            </p>
            {movie.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#ffd700', fontSize: '0.9rem' }}>★ {movie.rating}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  {movie.votes ? (movie.votes > 1000 ? Math.round(movie.votes/100)/10 + 'K votes' : movie.votes + ' votes') : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="seat-map">
        <div className="screen"></div>
        {Object.keys(rows).map(row => (
          <div key={row} className="row">
            <div className="row-label">{row}</div>
            {rows[row].map(seat => {
              const key = `${seat.row}-${seat.number}`
              const selected = selectedSeats.find(s => s.row === seat.row && s.number === seat.number)
              const seatClass = seat.status === 'booked' ? 'booked' : (selected ? 'selected' : 'available')
              return (
                <button key={key}
                  onClick={() => toggleSeat(seat)}
                  disabled={seat.status === 'booked'}
                  className={`seat-btn ${seatClass}`}>
                  {seat.number}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="checkout">
        <h4>Selected seats: {selectedSeats.length === 0 ? 'None' : selectedSeats.map(s => `${s.row}${s.number}`).join(', ')}</h4>
        <div className="muted" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Price: ₹{priceEach} each — Total: ₹{total}</div>

        <div className="checkout-form">
          <input placeholder="Your name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
          <input placeholder="Your email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
          <button className="pay-button" onClick={checkout} disabled={selectedSeats.length === 0}>
            💳 Pay ₹{total} & Book Now
          </button>
        </div>
        {message && <div className="message">{message}</div>}
      </div>

      <DemoPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentData={orderData}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
