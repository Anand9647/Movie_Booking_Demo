import React from 'react'

export default function MovieList({ movies, onSelect, isGithubPages }) {
  const resolvePoster = (p) => {
    if (!p) return '';
    if (isGithubPages) {
      // On GitHub Pages, use relative path from base URL
      return p.startsWith('/') ? `.${p}` : p;
    }
    return p.startsWith('/posters') ? `http://localhost:4000${p}` : p;
  }

  const formatVotes = (votes) => {
    if (!votes) return '';
    if (votes > 1000) return Math.round(votes / 100) / 10 + 'K Votes';
    return votes + ' Votes';
  }

  return (
    <section className="movie-list">
      {movies.map(m => (
        <div key={m.id} className="movie-card">
          <div className="movie-card-content">
            <div className="movie-poster">
              <img src={resolvePoster(m.posterUrl)} alt={m.title} />
            </div>
            <div className="movie-meta">
              <div className="movie-header">
                <h3 className="movie-title">{m.title}</h3>
                <div className="movie-rating">
                  <div className="rating-badge">
                    ★ {m.rating || '—'}
                  </div>
                  <div className="votes">{formatVotes(m.votes)}</div>
                </div>
              </div>
              <p className="movie-description">{m.description}</p>
              <div className="showtimes">
                {m.Showtimes && m.Showtimes.length > 0 ? m.Showtimes.map(s => {
                  const dt = new Date(s.time);
                  const hr = dt.getHours().toString().padStart(2,'0');
                  const min = dt.getMinutes().toString().padStart(2,'0');
                  return (
                    <button key={s.id} className="showtime-btn" onClick={() => onSelect(m, s)}>
                      {hr}:{min}
                    </button>
                  )
                }) : <em className="muted">No showtimes available</em>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
