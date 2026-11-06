import { Link, useNavigate } from 'react-router';

export default function NoEncontrado() {
  const navigate = useNavigate();

  return (
    <section className="pagina-404">
      <h1>404 - Dimensión desconocida</h1>
      <p>Parece que viajaste a un universo que no existe o la ruta es incorrecta.</p>
      
      <div className="acciones-404">
        <button onClick={() => navigate(-1)} className="btn-volver">
          &larr; Volver a donde estaba
        </button>
        
        <Link to="/" className="btn-principal">
          Ir a la Portada
        </Link>
      </div>
    </section>
  );
}