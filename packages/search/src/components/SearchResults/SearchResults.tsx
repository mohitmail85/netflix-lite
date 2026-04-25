import type { Movie } from '@netflix-lite/shared-types';
import { MovieCard } from '@netflix-lite/shared-components';
import './SearchResults.css';

interface SearchResultsProps {
  results: Movie[];
  query: string;
}

const SearchResults = ({ results, query }: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="search-empty">
        <h2>No results found</h2>
        {query && <p>Try adjusting your search or filters</p>}
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-results-header">
        <h2>
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && ` for "${query}"`}
        </h2>
      </div>
      <div className="search-results-grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
