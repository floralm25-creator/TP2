import { Routes, Route } from 'react-router';
import Layout from '../componentes/layout';


import Portada from '../paginas/portada';
import Listado from '../paginas/listado';
import Detalle from '../paginas/detalle';
import Favoritos from '../paginas/favoritos';
import NoEncontrado from '../paginas/noEncontrado';
import Login from '../paginas/login';

export default function Enrutador() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Portada />} />
        <Route path="personajes" element={<Listado />} />
        <Route path="personajes/:id" element={<Detalle />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="*" element={<NoEncontrado />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}