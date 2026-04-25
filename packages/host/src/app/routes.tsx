import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from '../pages/Home';
import Details from '../pages/Details';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load the Search microfrontend
const SearchPage = lazy(() => import('search/SearchPage'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route
        path="/search"
        element={
          <ErrorBoundary>
            <Suspense fallback={<div className="loading-spinner">Loading Search...</div>}>
              <SearchPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
