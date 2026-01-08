import type { Movie, MovieCategory } from "../types/movie";

export const movies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    year: 2008,
    posterUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example1",
  },
  {
    id: "2",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    year: 2010,
    posterUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example2",
  },
  {
    id: "3",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: ["Drama"],
    rating: 9.3,
    year: 1994,
    posterUrl:
      "https://images.unsplash.com/photo-1574267432644-f2f9e64a238b?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1574267432644-f2f9e64a238b?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example3",
  },
  {
    id: "4",
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    genre: ["Crime", "Drama"],
    rating: 8.9,
    year: 1994,
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example4",
  },
  {
    id: "5",
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    year: 1999,
    posterUrl:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example5",
  },
  {
    id: "6",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    genre: ["Drama", "Romance"],
    rating: 8.8,
    year: 1994,
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example6",
  },
  {
    id: "7",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    year: 2014,
    posterUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example7",
  },
  {
    id: "8",
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: ["Crime", "Drama"],
    rating: 9.2,
    year: 1972,
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example8",
  },
  {
    id: "9",
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    genre: ["Drama"],
    rating: 8.8,
    year: 1999,
    posterUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example9",
  },
  {
    id: "10",
    title: "The Lord of the Rings",
    description:
      "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring.",
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.8,
    year: 2001,
    posterUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example10",
  },
  {
    id: "11",
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
    genre: ["Action", "Adventure", "Drama"],
    rating: 8.5,
    year: 2000,
    posterUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example11",
  },
  {
    id: "12",
    title: "The Silence of the Lambs",
    description:
      "A young FBI cadet must receive the help of an incarcerated cannibal killer to catch another serial killer.",
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.6,
    year: 1991,
    posterUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=450&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=600&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=example12",
  },
];

export const movieCategories: MovieCategory[] = [
  {
    id: "trending",
    title: "Trending Now",
    movies: [movies[0], movies[1], movies[4], movies[6], movies[8]],
  },
  {
    id: "popular",
    title: "Popular on Netflix",
    movies: [movies[2], movies[3], movies[5], movies[7], movies[9]],
  },
  {
    id: "action",
    title: "Action & Adventure",
    movies: [movies[0], movies[4], movies[10], movies[1], movies[6]],
  },
  {
    id: "drama",
    title: "Drama",
    movies: [movies[2], movies[3], movies[5], movies[8], movies[11]],
  },
];

export const getFeaturedMovie = (): Movie => movies[0];

export const getMovieById = (id: string): Movie | undefined => {
  return movies.find((movie) => movie.id === id);
};
