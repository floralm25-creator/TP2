import { useState } from 'react';
import useCreaciones from '../hooks/useCreaciones';
import useAuth from '../hooks/useAuth';
import RenderizadorEstados from '../componentes/render.estados';

export default function Creaciones() {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [cargandoAccion, setCargandoAccion] = useState(false);

  const { personajes, cargando, error, agregarPersonaje, borrarPersonaje } = useCreaciones();
  const { usuario } = useAuth(); // Necesitamos saber quién es el usuario actual

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombre || !especie) return;
    
    setCargandoAccion(true);
    try {
      await agregarPersonaje(nombre, especie);
      // Limpiamos el formulario. La tabla se actualiza sola gracias al "En vivo"
      setNombre('');
      setEspecie('');
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setCargandoAccion(false);
    }
  };

  const manejarBorrado = async (id) => {
    if (!window.confirm("¿Seguro que querés borrar este personaje?")) return;
    
    try {
      await borrarPersonaje(id);
    } catch (err) {
      alert("Error al borrar: " + err.message);
    }
  };

  // Si no está logueado, le mostramos un aviso
  if (!usuario) {
    return (
      <section className="pagina-detalle">
        <div className="mensaje-estado error">Tenés que ingresar a tu cuenta para ver o crear personajes.</div>
      </section>
    );
  }

  return (
    <section style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Creaciones de la Comunidad</h1>

      {/* Formulario de creación */}
      <form onSubmit={manejarEnvio} className="tarjeta-detalle" style={{ marginBottom: '3rem', width: '100%', maxWidth: '100%' }}>
        <h2>Crear nuevo personaje</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Nombre del personaje" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ flex: 1, minWidth: '200px' }}
          />
          <input 
            type="text" 
            placeholder="Especie (ej: Humano, Alien)" 
            value={especie} 
            onChange={(e) => setEspecie(e.target.value)}
            style={{ flex: 1, minWidth: '200px' }} 
          />
          <button type="submit" className="btn-principal" disabled={cargandoAccion}>
            {cargandoAccion ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>

      {/* Listado en vivo */}
      <RenderizadorEstados cargando={cargando} error={error} vacio={personajes.length === 0}>
        <div className="grilla-personajes">
          {personajes.map((p) => (
            <article key={p.id} className="tarjeta">
              <h3>{p.nombre}</h3>
              <p><strong>Especie:</strong> {p.especie}</p>
              
              <div className="acciones-tarjeta">
                {/* REQUISITO CLAVE: Solo mostramos el botón borrar si el usuario logueado es el autor */}
                {usuario.id === p.autor_id ? (
                  <button 
                    onClick={() => manejarBorrado(p.id)}
                    style={{ backgroundColor: '#dc2626', color: 'white' }}
                  >
                    Borrar mi creación
                  </button>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '0.5rem' }}>
                    Creado por otro usuario
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </RenderizadorEstados>
    </section>
  );
}