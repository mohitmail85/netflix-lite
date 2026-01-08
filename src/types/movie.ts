export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  rating: number;
  year: number;
  posterUrl: string;
  heroImageUrl: string;
  trailerUrl?: string;
}

export interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
}
