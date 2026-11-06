import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import Enrutador from './rutas/enrutador';
import './estilos.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Enrutador />
    </BrowserRouter>
  </StrictMode>,
);