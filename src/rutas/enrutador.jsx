import { Routes, Route } from 'react-router';
import Layout from '../componentes/layout';
import RutaPrivada from '../componentes/rutaPrivada';
import Portada from '../paginas/portada';
import Listado from '../paginas/listado';
import Detalle from '../paginas/detalle';
import NoEncontrado from '../paginas/noEncontrado';
import Login from '../paginas/login';
import Creaciones from '../paginas/creaciones';
import Registro from '../paginas/registro';

export default function Enrutador() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Portada />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route element={<RutaPrivada />}>
          <Route path="personajes" element={<Listado />} />
          <Route path="personajes/:id" element={<Detalle />} />
          <Route path="creaciones" element={<Creaciones />} />
        </Route>

        <Route path="*" element={<NoEncontrado />} />

      </Route>
    </Routes>
  );
}