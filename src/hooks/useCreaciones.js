import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export default function useCreaciones(onNuevoPersonaje) {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const traerDatos = async () => {
      const { data, error } = await supabase
        .from('personajes_creados')
        .select('*')
        .order('creado_en', { ascending: false });

      if (error) setError(error.message);
      else setPersonajes(data);
      
      setCargando(false);
    };

    traerDatos();

    const canal = supabase
      .channel('canal-creaciones')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'personajes_creados' }, (payload) => {
        
        if (payload.eventType === 'INSERT') {
          setPersonajes((estadoPrevio) => [payload.new, ...estadoPrevio]);
          // Llamamos a la función de notificación si existe
          if (onNuevoPersonaje) onNuevoPersonaje(payload.new);
        } else if (payload.eventType === 'DELETE') {
          setPersonajes((estadoPrevio) => estadoPrevio.filter(p => p.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setPersonajes((estadoPrevio) => estadoPrevio.map(p => p.id === payload.new.id ? payload.new : p));
        }

      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []); // onNuevoPersonaje no se pone en dependencias para no re-renderizar infinitamente

  // Función interna para subir la imagen al Storage
  const subirImagen = async (archivo) => {
    if (!archivo) return null;
    const extension = archivo.name.split('.').pop();
    const nombreArchivo = `${Date.now()}_${Math.random().toString(36).substring(7)}.${extension}`;
    
    const { error } = await supabase.storage
      .from('imagenes_personajes')
      .upload(nombreArchivo, archivo);

    if (error) throw error;

    // Obtener la URL pública para guardarla en la base de datos
    const { data: urlData } = supabase.storage
      .from('imagenes_personajes')
      .getPublicUrl(nombreArchivo);

    return urlData.publicUrl;
  };

  const agregarPersonaje = async (datos, archivoImagen) => {
    let urlImagen = null;
    if (archivoImagen) {
      urlImagen = await subirImagen(archivoImagen);
    }

    const { error } = await supabase
      .from('personajes_creados')
      .insert([{ ...datos, imagen: urlImagen }]);
      
    if (error) throw error;
  };

  const editarPersonaje = async (id, datos, archivoImagen) => {
    let urlImagen = datos.imagen; // Mantenemos la actual por defecto
    if (archivoImagen) {
      urlImagen = await subirImagen(archivoImagen);
    }

    const { error } = await supabase
      .from('personajes_creados')
      .update({ ...datos, imagen: urlImagen })
      .eq('id', id);
      
    if (error) throw error;
  };

  const borrarPersonaje = async (id) => {
    const { error } = await supabase
      .from('personajes_creados')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  };

  return { personajes, cargando, error, agregarPersonaje, editarPersonaje, borrarPersonaje };
}