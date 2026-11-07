import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RutaPrivada() {
  const { usuario, cargando } = useAuth();


  if (cargando) {
    return <p>Verificando sesión...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
