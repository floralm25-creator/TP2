
export function MensajeCargando() {
  return (
    <div className="mensaje-estado">
      <p>Cargando información...</p>
    </div>
  );
}

export function MensajeError({ mensaje }) {
  return (
    <div className="mensaje-estado error">
      <h2>¡Ups! Algo salió mal</h2>
      <p>{mensaje}</p>
    </div>
  );
}

export function MensajeVacio() {
  return (
    <div className="mensaje-estado vacio">
      <h2>Sin resultados</h2>
      <p>La búsqueda no devolvió resultados. Probá cambiando los filtros.</p>
    </div>
  );
}


export default function RenderizadorEstados({ cargando, error, vacio, children }) {
  if (cargando) return <MensajeCargando />;
  
  if (error) return <MensajeError mensaje={error} />;
  
  if (vacio) return <MensajeVacio />;
  
  return children;
}