import { useParams, useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch.js';
import useFavoritos from '../hooks/useFavoritos.js';
import RenderizadorEstados from '../componentes/render.estados.jsx';

export default function Detalle() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const { datos, cargando, error, vacio } = useFetch(`/character/${id}`);

  const { alternarFavorito, esFavorito } = useFavoritos();

  return (
    <section className="pagina-detalle">
      <button onClick={() => navigate(-1)} className="btn-volver">
        &larr; Volver
      </button>

      <RenderizadorEstados cargando={cargando} error={error} vacio={vacio}>
        {datos && (
          <article className="tarjeta-detalle">
            <h1>{datos.name}</h1>
            <img 
              src={datos.image} 
              alt={`Imagen de ${datos.name}`} />
            
            <div className="info-personaje">
              <p><strong>Estado:</strong> {datos.status}</p>
              <p><strong>Especie:</strong> {datos.species}</p>
              <p><strong>Género:</strong> {datos.gender}</p>
              <p><strong>Origen:</strong> {datos.origin?.name}</p>
            </div>

            <button 
              onClick={() => alternarFavorito(datos)}
              aria-pressed={esFavorito(datos.id)} 
              className="btn-favorito"
            >
              {esFavorito(datos.id) ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            </button>
          </article>
        )}
      </RenderizadorEstados>
    </section>
  );
}