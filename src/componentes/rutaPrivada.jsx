
import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RutaPrivada() {
  const { usuario, cargando } = useAuth();

  // Esperamos a que Supabase compruebe la sesión
  if (cargando) {
    return <p>Verificando sesión...</p>;
  }

  // Si no hay usuario, volvemos al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, permitimos el acceso
  return <Outlet />;
}
