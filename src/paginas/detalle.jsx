import { useParams, useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch.js';

import RenderizadorEstados from '../componentes/render.estados.jsx';

export default function Detalle() {
  // 1. Obtenemos el ID de la URL usando useParams
  const { id } = useParams();
  
  // 2. Usamos useNavigate para el botón de "volver atrás"
  const navigate = useNavigate();

  // 3. Reutilizamos el Hook genérico para pedir los datos de un solo personaje
  const { datos, cargando, error, vacio } = useFetch(`/character/${id}`);


  // CORRECCIÓN DEL PROFESOR: Si ya terminó de cargar y la API tira error (404), 
  // mostramos el texto exacto "no existe" y el botón para volver.
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
      {/* Botón para volver atrás */}
      <button onClick={() => navigate(-1)} className="btn-volver">
        &larr; Volver
      </button>

      {/* Le pasamos error=false y vacio=false porque ya los atajamos arriba. 
          El renderizador ahora solo se encarga del estado "cargando" */}
      <RenderizadorEstados cargando={cargando} error={false} vacio={false}>
        {/* Si los datos existen, renderizamos la tarjeta completa */}
        {datos && (
          <article className="tarjeta-detalle">
            <h1>{datos.name}</h1>
            <img 
              src={datos.image} 
              alt={`Imagen de ${datos.name}`} // Obligatorio: Texto alternativo en imágenes
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