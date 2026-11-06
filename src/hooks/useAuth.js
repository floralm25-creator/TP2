import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export default function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Buscamos si ya hay una sesión guardada (cumple: "Al recargar la página, la sesión sigue abierta")
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
      setCargando(false);
    });

    // 2. Nos suscribimos a los cambios (si entra o sale, actualizamos el estado)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const registrar = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const ingresar = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const salir = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { usuario, cargando, registrar, ingresar, salir };
}