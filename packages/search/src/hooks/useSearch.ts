import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movies } from '@netflix-lite/shared-data';
import type { Movie } from '@netflix-lite/shared-types';
import { searchMovies, YEAR_RANGE, RATING_RANGE } from '../utils/searchEngine';
import type { SearchFilters } from '../utils/searchEngine';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [genres, setGenres] = useState<string[]>(
    searchParams.get('genre')?.split(',').filter(Boolean) || []
  );
  const [yearRange, setYearRange] = useState<[number, number]>([
    Number(searchParams.get('yearMin')) || YEAR_RANGE[0],
    Number(searchParams.get('yearMax')) || YEAR_RANGE[1]
  ]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([
    Number(searchParams.get('ratingMin')) || RATING_RANGE[0],
    Number(searchParams.get('ratingMax')) || RATING_RANGE[1]
  ]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
    if (genres.length > 0) params.set('genre', genres.join(','));
    if (yearRange[0] !== YEAR_RANGE[0]) params.set('yearMin', yearRange[0].toString());
    if (yearRange[1] !== YEAR_RANGE[1]) params.set('yearMax', yearRange[1].toString());
    if (ratingRange[0] !== RATING_RANGE[0]) params.set('ratingMin', ratingRange[0].toString());
    if (ratingRange[1] !== RATING_RANGE[1]) params.set('ratingMax', ratingRange[1].toString());

    setSearchParams(params, { replace: true });
  }, [query, genres, yearRange, ratingRange, setSearchParams]);

  const filters: SearchFilters = useMemo(
    () => ({
      query,
      genres,
      yearRange,
      ratingRange
    }),
    [query, genres, yearRange, ratingRange]
  );

  const results: Movie[] = useMemo(
    () => searchMovies(movies, filters),
    [filters]
  );

  const clearFilters = () => {
    setQuery('');
    setGenres([]);
    setYearRange(YEAR_RANGE);
    setRatingRange(RATING_RANGE);
  };

  return {
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
    hasActiveFilters: query || genres.length > 0 ||
      yearRange[0] !== YEAR_RANGE[0] || yearRange[1] !== YEAR_RANGE[1] ||
      ratingRange[0] !== RATING_RANGE[0] || ratingRange[1] !== RATING_RANGE[1]
  };
};
