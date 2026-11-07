import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargandoAccion, setCargandoAccion] = useState(false);

  // Traemos las funciones de nuestro Hook
  const { ingresar, registrar } = useAuth();
  const navigate = useNavigate();

  const manejarIngreso = async (e) => {
    e.preventDefault();
    setError(null);
    setCargandoAccion(true);
    
    try {
      await ingresar(email, password);
      // Si sale bien, lo mandamos directo al listado de personajes
      navigate('/personajes'); 
    } catch (err) {
      setError('Error al ingresar: ' + err.message);
    } finally {
      setCargandoAccion(false);
    }
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    setCargandoAccion(true);
    
    try {
      await registrar(email, password);
      navigate('/personajes');
    } catch (err) {
      setError('Error al registrarse: ' + err.message);
    } finally {
      setCargandoAccion(false);
    }
  };

  return (
    <section className="pagina-detalle">
      {/* Reutilizamos la clase tarjeta-detalle para mantener la estética blanca y centrada */}
      <form className="tarjeta-detalle" style={{ maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Acceso</h1>

        {/* Mostramos el error si el usuario se equivoca de clave */}
        {error && (
          <div className="mensaje-estado error" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}>
            <p>{error}</p>
          </div>
        )}

        <div className="accion-casillas" >
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.75rem' }}
          />
          <input 
            type="password" 
            placeholder="Contraseña (mínimo 6 caracteres)" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.75rem' }}
          />
        </div>

        {/* Los botones usan las clases mobile-first que definiste en el CSS */}
        <div className="acciones-tarjeta" style={{ width: '100%' }}>
          <button 
            onClick={manejarIngreso} 
            disabled={cargandoAccion} 
            className="btn-principal"
          >
            {cargandoAccion ? 'Procesando...' : 'Ingresar'}
          </button>
          
<p className="parrafo">
  ¿Todavía no tenés una cuenta?
  <Link to="/registro"> Registrate acá</Link>
</p>
        </div>
      </form>
    </section>
  );
}