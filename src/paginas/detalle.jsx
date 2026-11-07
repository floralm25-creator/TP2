import { useParams, useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch.js';

import RenderizadorEstados from '../componentes/render.estados.jsx';

export default function Detalle() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { datos, cargando, error, vacio } = useFetch(`/character/${id}`);


  if (!cargando && (error || vacio || !datos)) {
    return (
      <section className="pagina-detalle">
        <button onClick={() => navigate(-1)} className="btn-volver">
          &larr; Volver
        </button>
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2>no existe</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="pagina-detalle">
      
      <button onClick={() => navigate(-1)} className="btn-volver">
        &larr; Volver
      </button>

      <RenderizadorEstados cargando={cargando} error={false} vacio={false}>
       
        {datos && (
          <article className="tarjeta-detalle">
            <h1>{datos.name}</h1>
            <img 
              src={datos.image} 
              alt={`Imagen de ${datos.name}`} 
            />
            
            <div className="info-personaje">
              <p><strong>Estado:</strong> {datos.status}</p>
              <p><strong>Especie:</strong> {datos.species}</p>
              <p><strong>Género:</strong> {datos.gender}</p>
              <p><strong>Origen:</strong> {datos.origin?.name}</p>
            </div>

     
          </article>
        )}
      </RenderizadorEstados>
    </section>
  );
}