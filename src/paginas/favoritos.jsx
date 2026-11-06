import { useNavigate } from 'react-router';
import useFavoritos from '../hooks/useFavoritos';
import TarjetaPersonaje from '../componentes/tarjetaPersonaje'; 

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const navigate = useNavigate();

  return (
    <section className="pagina-favoritos">
      <h1>Mis Personajes Favoritos</h1>

      {favoritos.length === 0 ? (
        <div className="mensaje-estado vacio">
          <p>Todavía no agregaste ningún personaje a favoritos.</p>
          <button onClick={() => navigate('/personajes')} className="btn-explorar">
            Ir a explorar personajes
          </button>
        </div>
      ) : (
        <div className="grilla-personajes">
          {favoritos.map((personaje) => (
            <TarjetaPersonaje key={personaje.id} personaje={personaje} />
          ))}
        </div>
      )}
    </section>
  );
}