
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const { registrar } = useAuth();
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (password !== repetirPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      setCargando(true);

      const { data } = await registrar(email, password);

      if (data.session) {
        setMensaje('¡Tu cuenta fue creada correctamente!');
        navigate('/');
      } else {
        setMensaje(
          '¡Registro exitoso! Revisá tu correo electrónico para confirmar tu cuenta.'
        );
      }

    } catch (error) {
      setError(error.message || 'No se pudo crear la cuenta.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="pagina-detalle">
      <h1>Crear una cuenta</h1>
      <p>Registrate para formar parte de nuestra comunidad.</p>

      <form onSubmit={manejarRegistro} className="tarjeta-detalle" style={{ maxWidth: '400px' }}>
        <div className="accion-casillas">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            style={{ width: '100%', padding: '0.75rem' }}
          />
        

        
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
            style={{ width: '100%', padding: '0.75rem' }}
          />
        

        
          <label htmlFor="repetirPassword">Repetir contraseña</label>
          <input
            id="repetirPassword"
            type="password"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            placeholder="Volvé a ingresar tu contraseña"
            required
            style={{ width: '100%', padding: '0.75rem' }}
          />
        

        {error && <p role="alert">{error}</p>}
        {mensaje && <p>{mensaje}</p>}
        </div>
          <div className="acciones-tarjeta" style={{ width: '100%' }}>
              <button type="submit" disabled={cargando} className="btn-principal">
                {cargando ? 'Creando cuenta...' : 'Registrarme'}
              </button>
            

            <p className="parrafo">
              ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
            </p>
          </div>
      </form>
    </section>
  );
}
