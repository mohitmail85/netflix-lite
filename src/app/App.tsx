import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
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
