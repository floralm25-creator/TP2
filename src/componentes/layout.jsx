import { Outlet, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth'; // Importamos tu hook de autenticación

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const esPortada = location.pathname === '/';
  
  // Traemos el estado del usuario y la función para desloguearse
  const { usuario, salir } = useAuth();

  const manejarSalida = async () => {
    try {
      await salir(); // Esto borra la sesión de Supabase
      navigate('/login'); // Redirigimos al usuario a la pantalla de ingreso
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div>
      {!esPortada && (
        <header>
          <nav>
      <nav>
  <NavLink to="/">Portada</NavLink>

  {usuario && (
    <>
      <NavLink to="/personajes">Personajes</NavLink>
      
      <NavLink to="/creaciones">Comunidad</NavLink>

      <button
        onClick={manejarSalida}
        className="btn-principal"
      >
        Salir
      </button>
    </>
  )}

  {!usuario && (
    <NavLink to="/login">Ingresar</NavLink>
  )}
</nav>
          </nav>
        </header>
      )}
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

/*     <NavLink to="/" className={({ isActive }) => isActive ? 'activo' : ''}>
              Portada
            </NavLink>
            <NavLink to="/personajes" className={({ isActive }) => isActive ? 'activo' : ''}>
              Personajes
            </NavLink>
            <NavLink to="/favoritos" className={({ isActive }) => isActive ? 'activo' : ''}>
              Favoritos
            </NavLink>
            <NavLink to="/creaciones">Comunidad</NavLink>
            
            {/* Lógica de sesión: Si hay usuario, mostramos "Salir". Si no, "Ingresar" */
         /*   {usuario ? (
              <button 
                onClick={manejarSalida} 
                className="btn-principal" 
                style={{ backgroundColor: 'var(--color-texto)', color: 'white' }}
              >
                Salir
              </button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'activo' : ''}>
                Ingresar
              </NavLink>
            )}*/