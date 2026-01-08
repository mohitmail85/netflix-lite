import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="movie-card-image"
      />
      <div className="movie-card-overlay">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-info">
          <span className="movie-card-rating">★ {movie.rating}</span>
          <span className="movie-card-year">{movie.year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
