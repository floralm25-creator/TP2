import { Outlet, NavLink, useLocation } from 'react-router';

export default function Layout() {
  const location = useLocation();
  const esPortada = location.pathname === '/';

  return (
    <div>
   
      {!esPortada && (
        <header>
          <nav>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'activo' : ''}
            >
              Portada
            </NavLink>
            
            <NavLink 
              to="/personajes" 
              className={({ isActive }) => isActive ? 'activo' : ''}
            >
              Personajes
            </NavLink>
            
            <NavLink 
              to="/favoritos" 
              className={({ isActive }) => isActive ? 'activo' : ''}
            >
              Favoritos
            </NavLink>
          </nav>
        </header>
      )}
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}