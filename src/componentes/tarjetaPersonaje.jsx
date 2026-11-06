import { useNavigate } from 'react-router';
import useFavoritos from '../hooks/useFavoritos';

export default function TarjetaPersonaje({ personaje }) {
  const navigate = useNavigate();
  const { alternarFavorito, esFavorito } = useFavoritos();
  const marcado = esFavorito(personaje.id);

  return (
    <article className="tarjeta">
      <h2>{personaje.name}</h2>
      
      <img 
        src={personaje.image} 
        alt={`Retrato del personaje ${personaje.name}`} 
      />
      
      <div className="acciones-tarjeta">
        <button 
          onClick={() => navigate(`/personajes/${personaje.id}`)}
          className="btn-principal">
          Ver detalle
        </button>

        <button 
          onClick={() => alternarFavorito(personaje)}
          aria-pressed={marcado} className="btn-favorito">
          {marcado ? 'Quitar favorito' : 'Guardar favorito'}
        </button>
      </div>
    </article>
  );
}