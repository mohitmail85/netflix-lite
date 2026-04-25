import { BrowserRouter } from 'react-router-dom';
import { Header } from '@netflix-lite/shared-components';
import '@netflix-lite/shared-components/Header/styles';
import '@netflix-lite/shared-components/MovieCard/styles';
import '@netflix-lite/shared-components/MovieRow/styles';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
