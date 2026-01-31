import { useNavigate } from 'react-router-dom';
import { movieCategories, getFeaturedMovie } from '../../data/movies';
import MovieRow from '../../components/MovieRow';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const featuredMovie = getFeaturedMovie();

  const handleFeaturedClick = () => {
    navigate(`/details/${featuredMovie.id}`);
  };

  return (
    <>
      {/* React 19 Native Metadata - automatically hoisted to <head> */}
      <title>Netflix Lite - Watch Movies & TV Shows Online</title>
      <meta
        name="description"
        content="Watch thousands of movies and TV shows. Stream unlimited entertainment with Netflix Lite. Currently featuring: The Dark Knight, Inception, The Shawshank Redemption, and more."
      />

      {/* Open Graph tags for social media previews */}
      <meta property="og:title" content="Netflix Lite - Watch Movies & TV Shows Online" />
      <meta property="og:description" content="Stream unlimited entertainment with Netflix Lite. Watch trending movies and TV shows." />
      <meta property="og:image" content={featuredMovie.heroImageUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Netflix Lite - Watch Movies & TV Shows Online" />
      <meta name="twitter:description" content="Stream unlimited entertainment with Netflix Lite." />
      <meta name="twitter:image" content={featuredMovie.heroImageUrl} />

      <div className="home">
        <section className="hero" style={{ backgroundImage: `url(${featuredMovie.heroImageUrl})` }}>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">{featuredMovie.title}</h1>
              <p className="hero-description">{featuredMovie.description}</p>
              <div className="hero-buttons">
                <button className="hero-button hero-button-primary" onClick={handleFeaturedClick}>
                  ▶ Play
                </button>
                <button className="hero-button hero-button-secondary" onClick={handleFeaturedClick}>
                  ℹ More Info
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="movie-rows">
          {movieCategories.map((category) => (
            <MovieRow key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
