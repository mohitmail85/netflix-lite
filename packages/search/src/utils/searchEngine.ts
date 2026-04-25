import type { Movie } from '@netflix-lite/shared-types';

export interface SearchFilters {
  query: string;
  genres: string[];
  yearRange: [number, number];
  ratingRange: [number, number];
}

export const searchMovies = (
  movies: Movie[],
  filters: SearchFilters
): Movie[] => {
  return movies.filter((movie) => {
    // Text search in title and description
    const searchQuery = filters.query.toLowerCase().trim();
    if (searchQuery) {
      const matchesTitle = movie.title.toLowerCase().includes(searchQuery);
      const matchesDescription = movie.description.toLowerCase().includes(searchQuery);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    // Genre filter
    if (filters.genres.length > 0) {
      const hasMatchingGenre = filters.genres.some((genre) =>
        movie.genre.includes(genre)
      );
      if (!hasMatchingGenre) {
        return false;
      }
    }

    // Year range filter
    if (movie.year < filters.yearRange[0] || movie.year > filters.yearRange[1]) {
      return false;
    }

    // Rating range filter
    if (movie.rating < filters.ratingRange[0] || movie.rating > filters.ratingRange[1]) {
      return false;
    }

    return true;
  });
};

export const AVAILABLE_GENRES = [
  'Action',
  'Adventure',
  'Crime',
  'Drama',
  'Fantasy',
  'Romance',
  'Sci-Fi',
  'Thriller'
];

export const YEAR_RANGE: [number, number] = [1970, 2026];
export const RATING_RANGE: [number, number] = [0, 10];
