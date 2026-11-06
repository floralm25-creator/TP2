import { useSearchParams } from 'react-router';
import useFetch from '../hooks/useFetch.js';
import RenderizadorEstados from '../componentes/render.estados.jsx';
import TarjetaPersonaje from '../componentes/tarjetaPersonaje.jsx';

export default function Listado() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagina = searchParams.get('page') || '1';
  const nombre = searchParams.get('name') || '';
  const estado = searchParams.get('status') || '';
  const especie = searchParams.get('species') || '';

  const parametrosApi = new URLSearchParams();
  parametrosApi.set('page', pagina);
  if (nombre) parametrosApi.set('name', nombre);
  if (estado) parametrosApi.set('status', estado);
  if (especie) parametrosApi.set('species', especie);

 
  const { datos, cargando, error, vacio } = useFetch(`/character?${parametrosApi.toString()}`);

  
  const manejarFiltro = (e) => {
    const { name, value } = e.target;
    const nuevosParametros = new URLSearchParams(searchParams);
    
    if (value) {
      nuevosParametros.set(name, value);
    } else {
      nuevosParametros.delete(name);
    }
    
    
    if (name !== 'page') {
      nuevosParametros.set('page', '1');
    }

    setSearchParams(nuevosParametros);
  };

  const cambiarPagina = (nuevaPagina) => {
    const nuevosParametros = new URLSearchParams(searchParams);
    nuevosParametros.set('page', nuevaPagina);
    setSearchParams(nuevosParametros);
  };

  return (
    <section>
      <h1>Explorador de Personajes</h1>
      
      
      <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Buscar por nombre..." 
          value={nombre} 
          onChange={manejarFiltro} 
        />

        <select name="status" value={estado} onChange={manejarFiltro}>
          <option value="">Cualquier estado</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>

        <select name="species" value={especie} onChange={manejarFiltro}>
          <option value="">Cualquier especie</option>
          <option value="human">Humano</option>
          <option value="alien">Alien</option>
        </select>
      </form>

      
      <RenderizadorEstados cargando={cargando} error={error} vacio={vacio}>
        <div className="grilla-personajes">
          {datos?.results?.map(personaje => (
            <TarjetaPersonaje key={personaje.id} personaje={personaje} />
          ))}
        </div>

        
        <div className="contenedor-paginacion">
          <button 
            className="btn-paginacion"
            onClick={() => cambiarPagina(Number(pagina) - 1)} 
            disabled={pagina === '1'}
          >
            Anterior
          </button>
          
          <span className="texto-paginacion"> 
            Página {pagina} de {datos?.info?.pages || 1} 
          </span>
          
          <button 
            className="btn-paginacion"
            onClick={() => cambiarPagina(Number(pagina) + 1)}
            disabled={!datos?.info?.next}
          >
            Siguiente
          </button>
        </div>
      </RenderizadorEstados>
    </section>
  );
}