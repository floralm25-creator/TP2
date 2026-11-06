import { useState } from 'react';
import useCreaciones from '../hooks/useCreaciones';
import useAuth from '../hooks/useAuth';
import useNotificaciones from '../hooks/useNotificaciones';
import RenderizadorEstados from '../componentes/render.estados';

export default function Creaciones() {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [cargandoAccion, setCargandoAccion] = useState(false);

  const { usuario } = useAuth();
  const { permiso, pedirPermiso, enviarNotificacion } = useNotificaciones();

  // Función que le pasamos al hook de base de datos para que dispare al recibir un INSERT
  const avisarNuevoPersonaje = (nuevoPersonaje) => {
    // Evitamos que nos notifique de nuestros propios personajes
    if (usuario && nuevoPersonaje.autor_id !== usuario.id) {
      enviarNotificacion(
        "¡Nuevo personaje en la comunidad!", 
        `Alguien acaba de crear a ${nuevoPersonaje.nombre} (${nuevoPersonaje.especie})`
      );
    }
  };

  // Traemos los datos y le inyectamos la función de notificar
  const { personajes, cargando, error, agregarPersonaje, borrarPersonaje } = useCreaciones(avisarNuevoPersonaje);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombre || !especie) return;
    
    setCargandoAccion(true);
    try {
      await agregarPersonaje(nombre, especie);
      // Solo limpiamos los inputs; la tarjeta aparece sola gracias a la suscripción "En vivo"
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

  // Validación de seguridad visual: Si no hay usuario logueado, no mostramos nada
  if (!usuario) {
    return (
      <section className="pagina-detalle">
        <div className="mensaje-estado error">
          Tenés que ingresar a tu cuenta para ver o crear personajes.
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Creaciones de la Comunidad</h1>

      {/* SECCIÓN DE LA API DEL TELÉFONO: Manejo visual de los permisos */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        {permiso === 'default' && (
          <button onClick={pedirPermiso} className="btn-principal" style={{ backgroundColor: 'var(--color-foco)', color: 'white', border: 'none' }}>
            🔔 Activar notificaciones en vivo
          </button>
        )}
        
        {permiso === 'denied' && (
          <div className="mensaje-estado error" style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
            <strong>Notificaciones bloqueadas:</strong> Decidiste no recibir alertas. 
            Si querés enterarte al instante de las novedades, podés activarlas desde el candado en la barra de direcciones de tu navegador.
          </div>
        )}
      </div>

      {/* FORMULARIO DE CREACIÓN */}
      <form onSubmit={manejarEnvio} className="tarjeta-detalle" style={{ marginBottom: '3rem', width: '100%', maxWidth: '100%' }}>
        <h2>Crear nuevo personaje</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Nombre del personaje" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ flex: 1, minWidth: '200px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
          />
          <input 
            type="text" 
            placeholder="Especie (ej: Humano, Alien)" 
            value={especie} 
            onChange={(e) => setEspecie(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} 
          />
          <button type="submit" className="btn-principal" disabled={cargandoAccion}>
            {cargandoAccion ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>

      {/* LISTADO EN VIVO */}
      <RenderizadorEstados cargando={cargando} error={error} vacio={personajes.length === 0}>
        <div className="grilla-personajes">
          {personajes.map((p) => (
            <article key={p.id} className="tarjeta">
              <h3 style={{ color: 'var(--color-primario-oscuro)' }}>{p.nombre}</h3>
              <p><strong>Especie:</strong> {p.especie}</p>
              
              <div className="acciones-tarjeta">
                {/* REGLA DE NEGOCIO: Cada usuario borra solo lo suyo */}
                {usuario.id === p.autor_id ? (
                  <button 
                    onClick={() => manejarBorrado(p.id)}
                    style={{ backgroundColor: '#dc2626', color: 'white', border: 'none' }}
                  >
                    Borrar mi creación
                  </button>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', margin: 'auto' }}>
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