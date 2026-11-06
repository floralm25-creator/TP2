import { Link } from 'react-router';

export default function Portada() {
  return (
    <section className="pagina-portada">
      <div className="contenedor-portada">
        
        <div className="imagen-destacada">
          <img 
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" 
            alt="Rick and Morty" 
            className="foto-portada"
          />
        </div>

        <h1>Bienvenido al Explorador</h1>
        
        <p>
          Preparate para explorar todo el multiverso. Podrás buscar personajes por nombre, filtrarlos por estado y especie, ver sus detalles completos y guardar tus favoritos para no perderlos de vista en ninguna dimensión.
        </p>

        <div className="acciones-portada">
          <Link to="/personajes" className="btn-principal btn-grande">
            Comenzar a explorar
          </Link>
        </div>
        
      </div>
    </section>
  );
}