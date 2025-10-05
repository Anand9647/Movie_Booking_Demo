import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import SeatSelector from './components/SeatSelector'
import './styles.css'

const API = 'http://localhost:4000/api'

export default function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])

  useEffect(() => {
    fetch(API + '/movies').then(r => r.json()).then(setMovies)
  }, [])

  useEffect(() => {
    if (selectedShowtime) {
      fetch(`${API}/showtimes/${selectedShowtime.id}/seats`).then(r => r.json()).then(setSeats)
      setSelectedSeats([])
    }
  }, [selectedShowtime])

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <div className="logo">MB</div>
          <div>
            <h1 className="title">Movie Booking</h1>
            <p className="muted">Pick a movie, choose seats and book — demo with mocked payments</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <MovieList movies={movies} onSelect={(m, s) => { setSelectedMovie(m); setSelectedShowtime(s); }} />

        <section className="right-column">
          {selectedMovie ? (
            <div className="selected-panel">
              <div className="movie-detail">
                <img src={selectedMovie.posterUrl?.startsWith('/posters') ? `http://localhost:4000${selectedMovie.posterUrl}` : selectedMovie.posterUrl} alt="poster" />
                <div>
                  <h2>{selectedMovie.title}</h2>
                  <p className="muted">{selectedMovie.description}</p>
                  <p className="muted">Duration: {selectedMovie.durationMin} min</p>
                  {selectedMovie.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <div className="rating-badge">★ {selectedMovie.rating}</div>
                      <span className="muted">{selectedMovie.votes ? (selectedMovie.votes > 1000 ? Math.round(selectedMovie.votes/100)/10 + 'K Votes' : selectedMovie.votes + ' Votes') : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedShowtime ? (
                <SeatSelector seats={seats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} showtime={selectedShowtime} movie={selectedMovie} />
              ) : (
                <div className="placeholder">Select a showtime to view seats</div>
              )}
            </div>
          ) : (
            <div className="placeholder">Select a movie to get started</div>
          )}
        </section>
      </main>
    </div>
  )
}
