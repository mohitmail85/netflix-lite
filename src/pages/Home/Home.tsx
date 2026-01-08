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
  );
};

export default Home;
