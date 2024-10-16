import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/tailwind.css'; 
import './index.css'; 
import App from './app/App.jsx';
import SimilarProfiles from './components/SimilarProfiles.jsx';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <SimilarProfiles />
  </StrictMode>,
);
