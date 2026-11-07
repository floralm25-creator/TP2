import { useNavigate } from 'react-router';

export default function TarjetaPersonaje({ personaje }) {
  const navigate = useNavigate();


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

      
      </div>
    </article>
  );
}