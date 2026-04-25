import { useSearch } from './hooks/useSearch';
import SearchInput from './components/SearchInput';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import './SearchPage.css';

const SearchPage = () => {
  const {
    query,
    setQuery,
    genres,
    setGenres,
    yearRange,
    setYearRange,
    ratingRange,
    setRatingRange,
    results,
    clearFilters,
    hasActiveFilters
  } = useSearch();

  return (
    <>
      {/* React 19 Native Metadata */}
      <title>Search Movies - Netflix Lite</title>
      <meta
        name="description"
        content="Search and discover thousands of movies. Filter by genre, year, and rating."
      />

      <div className="search-page">
        <div className="search-page-header">
          <h1>Search Movies</h1>
          <SearchInput value={query} onChange={setQuery} />
        </div>

        <div className="search-page-content">
          <aside className="search-page-sidebar">
            <SearchFilters
              genres={genres}
              yearRange={yearRange}
              ratingRange={ratingRange}
              onGenresChange={setGenres}
              onYearRangeChange={setYearRange}
              onRatingRangeChange={setRatingRange}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

          <main className="search-page-results">
            <SearchResults results={results} query={query} />
          </main>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
