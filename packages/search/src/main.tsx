import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '@netflix-lite/shared-components';
import '@netflix-lite/shared-components/Header/styles';
import '@netflix-lite/shared-components/MovieCard/styles';
import SearchPage from './SearchPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <SearchPage />
        </main>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
