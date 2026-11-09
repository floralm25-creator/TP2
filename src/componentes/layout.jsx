import { Outlet, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const esPortada = location.pathname === '/';

  const { usuario, salir } = useAuth();

  const manejarSalida = async () => {
    try {
      await salir();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div>
      {!esPortada && (
        <header>
          <nav>
            {!usuario && (
              <>
                <NavLink to="/">Portada</NavLink>
                <NavLink to="/login">Ingresar</NavLink>
              </>
            )}

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
          </nav>
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}
