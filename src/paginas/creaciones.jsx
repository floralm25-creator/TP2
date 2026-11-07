import { useState } from 'react';
import useCreaciones from '../hooks/useCreaciones';
import useAuth from '../hooks/useAuth';
import useNotificaciones from '../hooks/useNotificaciones';
import RenderizadorEstados from '../componentes/render.estados';

export default function Creaciones() {
  
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [estado, setEstado] = useState('');
  const [genero, setGenero] = useState('');
  const [origen, setOrigen] = useState('');
  const [archivo, setArchivo] = useState(null);
  
  
  const [editandoId, setEditandoId] = useState(null);
  const [cargandoAccion, setCargandoAccion] = useState(false);

  const { usuario } = useAuth();
  const { permiso, pedirPermiso, enviarNotificacion } = useNotificaciones();

 
const avisarNuevoPersonaje = (personaje, tipoEvento) => {
  if (usuario && personaje.autor_id !== usuario.id) {

    if (tipoEvento === 'INSERT') {
      enviarNotificacion(
        '¡Nuevo personaje en la comunidad!',
        `Alguien creó a ${personaje.nombre} (${personaje.especie})`
      );
    }

    if (tipoEvento === 'UPDATE') {
      enviarNotificacion(
        '¡Personaje modificado!',
        `Se modificó a ${personaje.nombre} (${personaje.especie})`
      );
    }
  }
};


  const { personajes, cargando, error, agregarPersonaje, editarPersonaje, borrarPersonaje } = useCreaciones(avisarNuevoPersonaje);

  const limpiarFormulario = () => {
    setNombre('');
    setEspecie('');
    setEstado('');
    setGenero('');
    setOrigen('');
    setArchivo(null);
    setEditandoId(null);
    document.getElementById('input-imagen').value = ''; 
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombre || !especie) return alert("Nombre y especie son obligatorios");
    
    setCargandoAccion(true);
    try {
      const datos = { nombre, especie, estado, genero, origen };
      
      if (editandoId) {
        await editarPersonaje(editandoId, datos, archivo);
      } else {
        await agregarPersonaje(datos, archivo);
      }
      
      limpiarFormulario();
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setCargandoAccion(false);
    }
  };

  const prepararEdicion = (personaje) => {
    setNombre(personaje.nombre || '');
    setEspecie(personaje.especie || '');
    setEstado(personaje.estado || '');
    setGenero(personaje.genero || '');
    setOrigen(personaje.origen || '');
    setEditandoId(personaje.id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const manejarBorrado = async (id) => {
    if (!window.confirm("¿Seguro que querés borrar este personaje?")) return;
    try {
      await borrarPersonaje(id);
      if (editandoId === id) limpiarFormulario();
    } catch (err) {
      alert("Error al borrar: " + err.message);
    }
  };

  return (
    <section style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Creaciones de la Comunidad</h1>

      {/* NOTIFICACIONES */}
     <div style={{ marginBottom: '2rem', textAlign: 'center' }}>

  {permiso === 'default' && (
    <button
      onClick={pedirPermiso}
      className="btn-principal"
      style={{ backgroundColor: 'var(--color-foco)', color: 'white', border: 'none' }}
    >
      Activar notificaciones
    </button>
  )}

  {permiso === 'granted' && (
    <>
      <p>Notificaciones habilitadas</p>

      
    </>
  )}

  {permiso === 'denied' && (
    <p>
      Las notificaciones están bloqueadas.
      Podés habilitarlas desde los permisos del navegador.
    </p>
  )}

</div>

      {/* FORMULARIO */}
      <form onSubmit={manejarEnvio} className="tarjeta-detalle" style={{ marginBottom: '3rem', width: '100%', maxWidth: '100%', padding: '2rem' }}>
        <h2>{editandoId ? 'Editar personaje' : 'Crear nuevo personaje'}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Especie *" value={especie} onChange={(e) => setEspecie(e.target.value)} required style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <select value={estado} onChange={(e) => setEstado(e.target.value)} style={inputStyle}>
              <option value="">Estado (Opcional)</option>
              <option value="Vivo">Vivo</option>
              <option value="Muerto">Muerto</option>
              <option value="Desconocido">Desconocido</option>
            </select>
            
            <select value={genero} onChange={(e) => setGenero(e.target.value)} style={inputStyle}>
              <option value="">Género (Opcional)</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Desconocido">Desconocido</option>
            </select>
            
            <input 
    type="text" 
    placeholder="Origen (ej: Tierra, Marte) *" 
    value={origen} 
    onChange={(e) => setOrigen(e.target.value)} 
    style={inputStyle} 
  />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Imagen del personaje (Opcional):</label>
            <input 
              id="input-imagen"
              type="file" 
              accept="image/*" 
              onChange={(e) => setArchivo(e.target.files[0])} 
              style={{ width: '100%' }}
            />
            {editandoId && <small style={{ color: '#666' }}>Dejá esto vacío si no querés cambiar la imagen actual.</small>}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-principal" disabled={cargandoAccion} style={{ flex: 1 }}>
              {cargandoAccion ? 'Guardando...' : (editandoId ? 'Actualizar personaje' : 'Guardar personaje')}
            </button>
            {editandoId && (
              <button type="button" onClick={limpiarFormulario} className="btn-secundario" style={{ flex: 1 }}>
                Cancelar edición
              </button>
            )}
          </div>
        </div>
      </form>

      {/* GRILLA EN VIVO */}
      <RenderizadorEstados cargando={cargando} error={error} >
        <div className="grilla-personajes">
          {personajes.map((p) => (
            <article key={p.id} className="tarjeta" style={{ display: 'flex', flexDirection: 'column' }}>
              
              
              {p.imagen ? (
                <img 
                  src={p.imagen} 
                  alt={p.nombre} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#64748b' }}>Sin imagen</span>
                </div>
              )}

              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--color-primario-oscuro)', margin: '0 0 0.5rem 0' }}>{p.nombre}</h3>
                <p style={{ margin: '0 0 0.25rem 0' }}><strong>Especie:</strong> {p.especie}</p>
                {p.estado && <p style={{ margin: '0 0 0.25rem 0' }}><strong>Estado:</strong> {p.estado}</p>}
                {p.genero && <p style={{ margin: '0 0 0.25rem 0' }}><strong>Género:</strong> {p.genero}</p>}
                {p.origen && <p style={{ margin: '0 0 1rem 0' }}><strong>Origen:</strong> {p.origen}</p>}
                
                <div className="acciones-tarjeta" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  {usuario?.id === p.autor_id ? (
                    <>
                      <button 
                        onClick={() => prepararEdicion(p)}
                        style={{ flex: 1, backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => manejarBorrado(p.id)}
                        style={{ flex: 1, backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Borrar
                      </button>
                    </>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', width: '100%' }}>
                      Creado por la comunidad
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </RenderizadorEstados>
    </section>
  );
}


const inputStyle = { flex: 1, minWidth: '150px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' };