import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export default function useCreaciones() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Pedimos los datos iniciales
    const traerDatos = async () => {
      const { data, error } = await supabase
        .from('personajes_creados')
        .select('*')
        .order('creado_en', { ascending: false }); // Los más nuevos primero

      if (error) setError(error.message);
      else setPersonajes(data);
      
      setCargando(false);
    };

    traerDatos();

    // 2. LA OPCIÓN A: Suscripción en vivo a los cambios de la tabla
    const canal = supabase
      .channel('cambios-db')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'personajes_creados' }, (payload) => {
        
        // Actualizamos el estado sin perder lo anterior
        if (payload.eventType === 'INSERT') {
          setPersonajes((estadoPrevio) => [payload.new, ...estadoPrevio]);
        } else if (payload.eventType === 'DELETE') {
          setPersonajes((estadoPrevio) => estadoPrevio.filter(p => p.id !== payload.old.id));
        }

      })
      .subscribe();

    // 3. Limpieza del efecto obligatoria
    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  const agregarPersonaje = async (nombre, especie) => {
    // No hace falta pasar el autor_id porque Supabase lo inyecta por defecto gracias a tus reglas SQL
    const { error } = await supabase
      .from('personajes_creados')
      .insert([{ nombre, especie }]);
      
    if (error) throw error;
  };

  const borrarPersonaje = async (id) => {
    const { error } = await supabase
      .from('personajes_creados')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  };

  return { personajes, cargando, error, agregarPersonaje, borrarPersonaje };
}