import type { MovieCategory } from '../../types/movie';
import MovieCard from '../MovieCard';
import './MovieRow.css';

interface MovieRowProps {
  category: MovieCategory;
}

const MovieRow = ({ category }: MovieRowProps) => {
  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{category.title}</h2>
      <div className="movie-row-container">
        <div className="movie-row-content">
          {category.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
