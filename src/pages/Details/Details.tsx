import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getMovieById } from '../../data/movies';
import './Details.css';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const movie = id ? getMovieById(id) : undefined;

  if (!movie) {
    return (
      <div className="details-error">
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handleTrailerClick = () => {
    setShowTrailerModal(true);
  };

  const closeModal = () => {
    setShowTrailerModal(false);
  };

  return (
    <div className="details">
      <section className="details-hero" style={{ backgroundImage: `url(${movie.heroImageUrl})` }}>
        <div className="details-hero-overlay">
          <div className="details-content">
            <button className="back-button" onClick={() => navigate('/')}>
              ← Back
            </button>
            <h1 className="details-title">{movie.title}</h1>
            <div className="details-meta">
              <span className="details-rating">★ {movie.rating}</span>
              <span className="details-year">{movie.year}</span>
              <span className="details-genres">{movie.genre.join(', ')}</span>
            </div>
            <p className="details-description">{movie.description}</p>
            <div className="details-buttons">
              <button className="details-button details-button-primary" onClick={handleTrailerClick}>
                ▶ Play Trailer
              </button>
              <button
                className={`details-button details-button-secondary ${isInWatchlist ? 'in-watchlist' : ''}`}
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {showTrailerModal && (
        <div className="trailer-modal" onClick={closeModal}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="trailer-modal-close" onClick={closeModal}>×</button>
            <div className="trailer-placeholder">
              <h3>Trailer Preview</h3>
              <p>Trailer would play here</p>
              <p className="trailer-url">{movie.trailerUrl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
