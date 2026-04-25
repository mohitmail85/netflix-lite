import { AVAILABLE_GENRES, YEAR_RANGE, RATING_RANGE } from '../../utils/searchEngine';
import './SearchFilters.css';

interface SearchFiltersProps {
  genres: string[];
  yearRange: [number, number];
  ratingRange: [number, number];
  onGenresChange: (genres: string[]) => void;
  onYearRangeChange: (range: [number, number]) => void;
  onRatingRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const SearchFilters = ({
  genres,
  yearRange,
  ratingRange,
  onGenresChange,
  onYearRangeChange,
  onRatingRangeChange,
  onClearFilters,
  hasActiveFilters
}: SearchFiltersProps) => {
  const handleGenreToggle = (genre: string) => {
    if (genres.includes(genre)) {
      onGenresChange(genres.filter((g) => g !== genre));
    } else {
      onGenresChange([...genres, genre]);
    }
  };

  return (
    <div className="search-filters">
      <div className="search-filters-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Genre Filter */}
      <div className="filter-section">
        <h4>Genres</h4>
        <div className="genre-checkboxes">
          {AVAILABLE_GENRES.map((genre) => (
            <label key={genre} className="genre-checkbox">
              <input
                type="checkbox"
                checked={genres.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year Range Filter */}
      <div className="filter-section">
        <h4>Release Year</h4>
        <div className="range-inputs">
          <input
            type="number"
            value={yearRange[0]}
            min={YEAR_RANGE[0]}
            max={yearRange[1]}
            onChange={(e) => onYearRangeChange([Number(e.target.value), yearRange[1]])}
            className="range-input"
          />
          <span>to</span>
          <input
            type="number"
            value={yearRange[1]}
            min={yearRange[0]}
            max={YEAR_RANGE[1]}
            onChange={(e) => onYearRangeChange([yearRange[0], Number(e.target.value)])}
            className="range-input"
          />
        </div>
        <input
          type="range"
          min={YEAR_RANGE[0]}
          max={YEAR_RANGE[1]}
          value={yearRange[0]}
          onChange={(e) => onYearRangeChange([Number(e.target.value), yearRange[1]])}
          className="range-slider"
        />
        <input
          type="range"
          min={YEAR_RANGE[0]}
          max={YEAR_RANGE[1]}
          value={yearRange[1]}
          onChange={(e) => onYearRangeChange([yearRange[0], Number(e.target.value)])}
          className="range-slider"
        />
      </div>

      {/* Rating Range Filter */}
      <div className="filter-section">
        <h4>Rating</h4>
        <div className="range-inputs">
          <input
            type="number"
            value={ratingRange[0]}
            min={RATING_RANGE[0]}
            max={ratingRange[1]}
            step="0.1"
            onChange={(e) => onRatingRangeChange([Number(e.target.value), ratingRange[1]])}
            className="range-input"
          />
          <span>to</span>
          <input
            type="number"
            value={ratingRange[1]}
            min={ratingRange[0]}
            max={RATING_RANGE[1]}
            step="0.1"
            onChange={(e) => onRatingRangeChange([ratingRange[0], Number(e.target.value)])}
            className="range-input"
          />
        </div>
        <input
          type="range"
          min={RATING_RANGE[0]}
          max={RATING_RANGE[1]}
          step="0.1"
          value={ratingRange[0]}
          onChange={(e) => onRatingRangeChange([Number(e.target.value), ratingRange[1]])}
          className="range-slider"
        />
        <input
          type="range"
          min={RATING_RANGE[0]}
          max={RATING_RANGE[1]}
          step="0.1"
          value={ratingRange[1]}
          onChange={(e) => onRatingRangeChange([ratingRange[0], Number(e.target.value)])}
          className="range-slider"
        />
      </div>
    </div>
  );
};

export default SearchFilters;
