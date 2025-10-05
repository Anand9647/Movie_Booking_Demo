import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import SeatSelector from './components/SeatSelector'
import './styles.css'
import { mockAPI } from './mockData'

const API = 'http://localhost:4000/api'
// Detect GitHub Pages or if backend is not available
const IS_GITHUB_PAGES = import.meta.env.MODE === 'production' && window.location.hostname.includes('github.io')

export default function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [usingMockData, setUsingMockData] = useState(IS_GITHUB_PAGES)

  useEffect(() => {
    if (IS_GITHUB_PAGES) {
      // Use mock data for GitHub Pages
      mockAPI.movies().then(setMovies)
      setUsingMockData(true)
    } else {
      // Try backend first, fall back to mock data if not available
      fetch(API + '/movies')
        .then(r => {
          if (!r.ok) throw new Error('Backend not available')
          return r.json()
        })
        .then(setMovies)
        .catch(() => {
          console.log('Backend not available, using mock data')
          setUsingMockData(true)
          mockAPI.movies().then(setMovies)
        })
    }
  }, [])

  useEffect(() => {
    if (selectedShowtime) {
      if (usingMockData) {
        // Use mock seats
        mockAPI.seats(selectedShowtime.id).then(setSeats)
      } else {
        fetch(`${API}/showtimes/${selectedShowtime.id}/seats`)
          .then(r => r.json())
          .then(setSeats)
          .catch(() => {
            console.log('Backend not available, using mock seats')
            mockAPI.seats(selectedShowtime.id).then(setSeats)
          })
      }
      setSelectedSeats([])
    }
  }, [selectedShowtime, usingMockData])

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <div className="logo">MB</div>
          <div>
            <h1 className="title">Movie Booking</h1>
            <p className="muted">Pick a movie, choose seats and book — demo with mocked payments{usingMockData ? ' (Static Demo)' : ''}</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <MovieList movies={movies} onSelect={(m, s) => { setSelectedMovie(m); setSelectedShowtime(s); }} isGithubPages={usingMockData} />

        <section className="right-column">
          {selectedMovie ? (
            <div className="selected-panel">
              <div className="movie-detail">
                <img src={selectedMovie.posterUrl?.startsWith('/posters') ? (usingMockData ? selectedMovie.posterUrl : `http://localhost:4000${selectedMovie.posterUrl}`) : selectedMovie.posterUrl} alt="poster" />
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
                <SeatSelector seats={seats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} showtime={selectedShowtime} movie={selectedMovie} isGithubPages={usingMockData} />
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
