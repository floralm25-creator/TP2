import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export default function useNotificaciones(onNuevoPersonaje) {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Pedimos los datos iniciales a la base de datos
    const traerDatos = async () => {
      setCargando(true);
      const { data, error: err } = await supabase
        .from('personajes_creados')
        .select('*')
        .order('creado_en', { ascending: false }); // Ordenamos para ver los más nuevos arriba

      if (err) {
        setError(err.message);
      } else {
        setPersonajes(data);
      }
      
      setCargando(false);
    };

    traerDatos();

    // 2. OPCIÓN A (En Vivo): Nos suscribimos a los cambios de la tabla
    const canal = supabase
      .channel('canal-notificaciones')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'personajes_creados' }, (payload) => {
        
        if (payload.eventType === 'INSERT') {
          // Actualizamos la pantalla al instante sumando el nuevo personaje al principio
          setPersonajes((estadoPrevio) => [payload.new, ...estadoPrevio]);
          
          // Si conectamos las notificaciones desde la pantalla visual, disparamos el aviso
          if (onNuevoPersonaje) {
            onNuevoPersonaje(payload.new);
          }
          
        } else if (payload.eventType === 'DELETE') {
          // Si alguien borra un personaje, lo sacamos de la pantalla al instante
          setPersonajes((estadoPrevio) => estadoPrevio.filter(p => p.id !== payload.old.id));
        }

      })
      .subscribe();

    // 3. Limpieza del efecto (fundamental para no duplicar suscripciones)
    return () => {
      supabase.removeChannel(canal);
    };
  }, []); // El arreglo vacío indica que se suscribe solo una vez al montar el componente

  // Función para guardar (Supabase inyecta el ID del usuario automáticamente por tus reglas SQL)
  const agregarPersonaje = async (nombre, especie) => {
    const { error } = await supabase
      .from('personajes_creados')
      .insert([{ nombre, especie }]);
      
    if (error) throw error;
  };

  // Función para eliminar validando que coincida con el ID del personaje
  const borrarPersonaje = async (id) => {
    const { error } = await supabase
      .from('personajes_creados')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  };

  return { personajes, cargando, error, agregarPersonaje, borrarPersonaje };
}