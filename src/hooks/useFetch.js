import { useState, useEffect } from 'react';

export default function useFetch(endpoint) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [vacio, setVacio] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();
    const { signal } = controlador;

    const pedirDatos = async () => {
      setCargando(true);
      setError(null);
      setVacio(false);
      setDatos(null);

      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(`${baseUrl}${endpoint}`, { signal });

        if (!respuesta.ok) {
          if (respuesta.status === 404) {
            setVacio(true);
            setCargando(false);
            return;
          }
          throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        setDatos(data);
        setCargando(false);
        
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message);
        setCargando(false);
      }
    };

    pedirDatos();
    return () => {
      controlador.abort();
    };
  }, [endpoint]); 

  return { datos, cargando, error, vacio };
}