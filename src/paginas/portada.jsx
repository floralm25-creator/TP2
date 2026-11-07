import { Link } from 'react-router';
import { useNavigate } from 'react-router';

export default function Portada() {
    const navigate = useNavigate();

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
        
       <p style={{ marginBottom: '30px', color: '#666' }}>
        Iniciá sesión o registrate para acceder al contenido exclusivo.
        </p>
      
       
        <div 
        className="botones-portada" 
        style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
        >
        <button 
          onClick={() => navigate('/login')}
          className="btn-primario"
        >
          Iniciar sesión
        </button>
        
        <button 
          onClick={() => navigate('/registro')}
          className="btn-secundario"
        >
          Registrarse
        </button>
        
      </div>
      </div>
    </section>
  );
}
