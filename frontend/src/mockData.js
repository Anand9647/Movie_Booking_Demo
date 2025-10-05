// Mock data for GitHub Pages static deployment
// This provides demo data when the backend is not available

export const mockMovies = [
  {
    id: 1,
    title: 'Sunny Sanskari Ki Tulsi Kumari',
    description: 'Comedy / Romantic — a light-hearted family entertainer.',
    durationMin: 130,
    posterUrl: '/posters/s.avif',
    rating: 7.8,
    votes: 15000,
    Showtimes: [
      { id: 101, time: new Date(Date.now() + 2 * 3600000).toISOString(), MovieId: 1 },
      { id: 102, time: new Date(Date.now() + 5 * 3600000).toISOString(), MovieId: 1 }
    ]
  },
  {
    id: 2,
    title: 'Avatar: The Way of Water',
    description: 'Action/Adventure/Fantasy/Sci-Fi — the epic sea-bound chapter of the Avatar saga.',
    durationMin: 192,
    posterUrl: '/posters/a.avif',
    rating: 8.9,
    votes: 125000,
    Showtimes: [
      { id: 201, time: new Date(Date.now() + 3.5 * 3600000).toISOString(), MovieId: 2 },
      { id: 202, time: new Date(Date.now() + 6.5 * 3600000).toISOString(), MovieId: 2 }
    ]
  },
  {
    id: 3,
    title: 'Kantara: A Legend Chapter-1',
    description: 'Adventure/Drama/Thriller — a mythic tale rooted in folklore.',
    durationMin: 148,
    posterUrl: '/posters/k.avif',
    rating: 8.5,
    votes: 98000,
    Showtimes: [
      { id: 301, time: new Date(Date.now() + 5 * 3600000).toISOString(), MovieId: 3 },
      { id: 302, time: new Date(Date.now() + 8 * 3600000).toISOString(), MovieId: 3 }
    ]
  },
  {
    id: 4,
    title: 'Idli Kadai',
    description: 'Action/Drama/Family — an emotional, grounded drama.',
    durationMin: 115,
    posterUrl: '/posters/i.avif',
    rating: 7.2,
    votes: 8500,
    Showtimes: [
      { id: 401, time: new Date(Date.now() + 6.5 * 3600000).toISOString(), MovieId: 4 }
    ]
  },
  {
    id: 5,
    title: 'They Call Him OG',
    description: 'Action/Crime/Drama/Thriller — a gritty crime-thriller.',
    durationMin: 120,
    posterUrl: '/posters/t.avif',
    rating: 8.1,
    votes: 42000,
    Showtimes: [
      { id: 501, time: new Date(Date.now() + 2 * 3600000).toISOString(), MovieId: 5 },
      { id: 502, time: new Date(Date.now() + 5 * 3600000).toISOString(), MovieId: 5 }
    ]
  }
];

// Generate mock seats for a showtime
export function generateMockSeats(showtimeId) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seats = [];
  
  rows.forEach((row, rowIndex) => {
    for (let num = 1; num <= 10; num++) {
      // Randomly book some seats for demo purposes (10% chance)
      const isBooked = Math.random() < 0.1;
      seats.push({
        id: `${showtimeId}-${row}-${num}`,
        row,
        number: num,
        status: isBooked ? 'booked' : 'available',
        ShowtimeId: showtimeId
      });
    }
  });
  
  return seats;
}

// Mock API responses
export const mockAPI = {
  movies: () => Promise.resolve(mockMovies),
  seats: (showtimeId) => Promise.resolve(generateMockSeats(showtimeId)),
  createOrder: (data) => Promise.resolve({
    id: `demo_order_${Date.now()}`,
    entity: 'order',
    amount: Math.round(data.amount * 100),
    amount_paid: 0,
    amount_due: Math.round(data.amount * 100),
    currency: data.currency || 'INR',
    receipt: data.receipt || `receipt_${Date.now()}`,
    status: 'created',
    attempts: 0,
    notes: data.notes || {},
    created_at: Math.floor(Date.now() / 1000)
  }),
  verifyPayment: (data) => Promise.resolve({
    success: true,
    message: 'Demo payment verified successfully',
    isDemo: true
  }),
  createBooking: (data) => Promise.resolve({
    bookingId: `DEMO${Date.now()}`,
    message: 'Demo booking created successfully',
    isDemo: true
  })
};
